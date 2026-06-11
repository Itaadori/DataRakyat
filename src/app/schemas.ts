// lib/schemas.ts
import { z } from "zod";

// This is your master checklist blueprint
export const RegistrationSchema = z.object({
  nama: z.string().min(2, "Nama terlalu pendek").max(50, "Nama terlalu panjang"),
  email: z.string().email("Format email salah"),
  profesi: z.string().min(2, "Profesi harus diisi")
});