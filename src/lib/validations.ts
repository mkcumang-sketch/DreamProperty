import { z } from 'zod';

// Matches standard Indian phone numbers: +91 9839012345, 9839012345, 09839012345, 08299058827, etc.
export const indianPhoneRegex = /^(?:(?:\+|0{0,2})91(\s*[-]\s*)?|[0]?)?[6789]\d{9}$/;

export const leadFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters long' })
    .max(80, { message: 'Name must be under 80 characters' })
    .trim(),
  phone: z
    .string()
    .trim()
    .refine((val) => indianPhoneRegex.test(val.replace(/[\s-]/g, '')), {
      message: 'Please enter a valid 10-digit Indian phone number',
    }),
  email: z
    .string()
    .trim()
    .email({ message: 'Please enter a valid email address' })
    .optional()
    .or(z.literal('')),
  type: z.enum(['BUYER', 'SELLER', 'TENANT', 'LANDLORD', 'PARTNER', 'OTHER'], {
    required_error: 'Please select your property relationship',
  }),
  service: z.string().optional().or(z.literal('')),
  propertyType: z.string().optional().or(z.literal('')),
  location: z.string().max(100).optional().or(z.literal('')),
  budgetRange: z.string().optional().or(z.literal('')),
  message: z
    .string()
    .max(1000, { message: 'Message must not exceed 1000 characters' })
    .optional()
    .or(z.literal('')),
  language: z.enum(['en', 'hi']).default('en'),
  // Anti-spam honeypot (bots will fill this hidden field)
  hp: z.string().optional().or(z.literal('')),
});

export type LeadFormInput = z.infer<typeof leadFormSchema>;

export const adminLoginSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid admin email' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

export type AdminLoginInput = z.infer<typeof adminLoginSchema>;

export const leadStatusUpdateSchema = z.object({
  status: z.enum(['NEW', 'CONTACTED', 'QUOTED', 'WON', 'LOST']).optional(),
  notes: z.string().max(2000).optional(),
});
