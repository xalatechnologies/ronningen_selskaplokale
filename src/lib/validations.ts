import { z } from 'zod';

export const inquirySchema = z.object({
  event_type: z.string().min(1, 'Event type is required'),
  preferred_date: z.string().min(1, 'Preferred date is required'),
  flexible_date: z.boolean(),
  guest_count: z.number().min(1, 'Guest count must be at least 1'),
  language: z.enum(['no', 'en']),
  package_id: z.string().optional(),
  budget_range: z.string().optional(),
  needs_catering: z.boolean(),
  needs_decoration: z.boolean(),
  needs_staffing: z.boolean(),
  needs_viewing: z.boolean(),
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(8, 'Phone number is required'),
  company_name: z.string().optional(),
  message: z.string().optional(),
});

export type InquiryFormValues = z.infer<typeof inquirySchema>;
