


import { z } from "zod";

const followUpSchema = z.object({
  date: z.string().min(1, "Follow-up date required"),
  summary: z.string().min(1, "Summary required"),
});

export const visitorSchema = z.object({
    name: z.string().min(1, "Name is required"),
    contact: z
        .string()
        .min(1, "Contact is required")
        .refine((val) => /\S+@\S+\.\S+/.test(val) || /^\d{10}$/.test(val), {
            message: "Must be a valid email or phone number",
        }),
    visit_date: z.date(), // Removed future date validation
    purpose: z.string().min(1, "Purpose is required"),
    outcome: z.string().optional(),
    assignedTo: z.string().optional(),
    has_commitment: z.boolean().optional(),
    status: z.string().optional(),
    followUps: z.array(followUpSchema).optional(),
});
export type VisitorFormData = z.infer<typeof visitorSchema>;
export type FollowUpData = z.infer<typeof followUpSchema>

