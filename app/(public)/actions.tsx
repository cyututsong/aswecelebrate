// app/actions.ts (Server Actions file)
'use server';

export async function subscribeToNewsletter(email: string) {
  // This runs on the server
  console.log('Subscribing:', email);
  
  // Validate on server
  if (!email.includes('@')) {
    throw new Error('Invalid email');
  }
  
  // Your database/API logic
  //await db.subscribers.create({ email });
  
  return { success: true, email };
}
