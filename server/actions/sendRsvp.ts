'use server';

import nodemailer from 'nodemailer';
import { RsvpFormData } from '@/components/forms/callie/RsvpForm';

export async function sendRsvpAction(data: RsvpFormData) {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: 'gantero15@gmail.com',
      subject: `New RSVP Submission from ${data.name || 'a Guest'}`,
      html: `
        <h2>New RSVP Submission</h2>
        <p><strong>Name:</strong> ${data.name || 'Not provided'}</p>
        <p><strong>Email:</strong> ${data.email || 'Not provided'}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
        <p><strong>Attending:</strong> ${data.attending === 'yes' ? "Yes, I'll be there" : "Sorry, can't make it"}</p>
        <p><strong>Comments:</strong> ${data.comments || 'None'}</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error: 'Failed to send email.' };
  }
}