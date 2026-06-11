// app/actions/register.ts
'use server'; // This tells Next.js: "Run this safely on the server only!"

// We import the checklist from your app folder
import { RegistrationSchema } from "../schemas"; 

export async function handleRegistration(formData: unknown) {
  // The Guard runs the data through the checklist here!
  const result = RegistrationSchema.safeParse(formData);

  // If the data doesn't match the checklist, kick it out!
  if (!result.success) {
    return { 
      success: false, 
      errors: result.error.flatten().fieldErrors 
    };
  }

  // If it passes, the data is safe! 
  const { nama, email, profesi } = result.data;
  
  // TODO: Save to your database here safely later!
  
  return { success: true };
}