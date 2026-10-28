
import { createClient } from '@supabase/supabase-js';
import { createHmac, randomUUID } from 'crypto';
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const rateLimitSecret = process.env.WISHES_RATE_LIMIT_SECRET;

const supabaseAdmin =
  supabaseUrl && serviceRoleKey
    ? createClient(supabaseUrl, serviceRoleKey, {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      })
    : null;

export async function POST(request: NextRequest) {
  if (!supabaseAdmin || !rateLimitSecret) {
    console.error('Wishes API environment variables are missing.');

    return NextResponse.json(
      { error: 'The service is temporarily unavailable.' },
      { status: 500 },
    );
  }

  try {
    const formData = await request.formData();

    const celebrantEmail = String(
      formData.get('celebrantEmail') ?? '',
    ).trim().toLowerCase();

    const guestName = String(formData.get('guestName') ?? '').trim();
    const message = String(formData.get('message') ?? '').trim();
    const imageEntry = formData.get('image');

    const image =
      imageEntry instanceof File && imageEntry.size > 0
        ? imageEntry
        : null;

    if (
      !celebrantEmail ||
      celebrantEmail.length > 254 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(celebrantEmail)
    ) {
      return NextResponse.json(
        { error: 'Please provide a valid celebrant email.' },
        { status: 400 },
      );
    }

    if (!guestName || guestName.length > 100) {
      return NextResponse.json(
        { error: 'Your name is required and must be 100 characters or fewer.' },
        { status: 400 },
      );
    }

    if (!message || message.length > 3000) {
      return NextResponse.json(
        { error: 'Your message is required and must be 3000 characters or fewer.' },
        { status: 400 },
      );
    }

    if (image) {
      const allowedTypes = [
        'image/jpeg',
        'image/png',
        'image/webp',
        'image/gif',
      ];

      if (!allowedTypes.includes(image.type)) {
        return NextResponse.json(
          { error: 'Please upload a JPG, PNG, WEBP, or GIF image.' },
          { status: 400 },
        );
      }

      if (image.size > 5 * 1024 * 1024) {
        return NextResponse.json(
          { error: 'The image must be 5 MB or smaller.' },
          { status: 400 },
        );
      }
    }

    // Use only an IP header supplied by your trusted hosting proxy.
    // Confirm Hostinger's proxy behavior before relying on these headers.
    const forwardedFor = request.headers.get('x-forwarded-for');
    const realIp = request.headers.get('x-real-ip');
    const ip = realIp?.trim() || forwardedFor?.split(',')[0]?.trim();

    if (!ip) {
      return NextResponse.json(
        { error: 'Unable to verify your request. Please try again.' },
        { status: 400 },
      );
    }

    const ipHash = createHmac('sha256', rateLimitSecret)
      .update(ip)
      .digest('hex');

    const { data: allowed, error: rateLimitError } =
      await supabaseAdmin.rpc('check_wishes_rate_limit', {
        p_ip_hash: ipHash,
      });

    if (rateLimitError) {
      console.error('Wishes rate-limit check failed:', rateLimitError);

      return NextResponse.json(
        { error: 'Unable to submit your wish right now. Please try again.' },
        { status: 500 },
      );
    }

    if (allowed !== true) {
      return NextResponse.json(
        { error: 'You have reached the limit of 3 submissions per 10 minutes. Please try again later.' },
        {
          status: 429,
          headers: { 'Retry-After': '600' },
        },
      );
    }

    let publicImageUrl: string | null = null;

    if (image) {
      const extensionByType: Record<string, string> = {
        'image/jpeg': 'jpg',
        'image/png': 'png',
        'image/webp': 'webp',
        'image/gif': 'gif',
      };

      const filePath =
        `uploads/${randomUUID()}.${extensionByType[image.type]}`;

      const { error: uploadError } = await supabaseAdmin.storage
        .from('capture-moments')
        .upload(filePath, Buffer.from(await image.arrayBuffer()), {
          contentType: image.type,
          upsert: false,
        });

      if (uploadError) {
        console.error('Wish photo upload failed:', uploadError);

        return NextResponse.json(
          { error: 'Photo upload failed. Please try again.' },
          { status: 500 },
        );
      }

      const { data: urlData } = supabaseAdmin.storage
        .from('capture-moments')
        .getPublicUrl(filePath);

      publicImageUrl = urlData.publicUrl;
    }

    const { data, error: insertError } = await supabaseAdmin
      .from('wishes')
      .insert({
        celebrant_email: celebrantEmail,
        guest_name: guestName,
        message,
        image_url: publicImageUrl,
      })
      .select()
      .single();

    if (insertError) {
      console.error('Wish insert failed:', insertError);

      return NextResponse.json(
        { error: 'Unable to save your wish. Please try again.' },
        { status: 500 },
      );
    }

    return NextResponse.json({ wish: data }, { status: 201 });
  } catch (error) {
    console.error('Wishes API error:', error);

    return NextResponse.json(
      { error: 'An unexpected error occurred while submitting your wish.' },
      { status: 500 },
    );
  }
}
