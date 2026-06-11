'use server';

import { RegistrationSchema } from "../schemas"; 

export async function handleRegistration(formData: unknown) {
  const result = RegistrationSchema.safeParse(formData);

  if (!result.success) {
    return { 
      success: false, 
      errors: result.error.flatten().fieldErrors 
    };
  }

  const { nama, email, profesi } = result.data;
  return { success: true };
}