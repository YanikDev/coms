import { z } from "zod";

export const meetingSchema = z.object({
  date: z.string().min(1, "Date is required"),
  type: z.string().min(1, "Meeting type is required"),
  agenda: z.string().min(1, "Agenda is required"),
  mom: z.string().min(1, "MoM is required"),
  actionPoints: z.string().min(1, "Action Points are required"),
  assignedTo: z.string().min(1, "Assigned officer is required"),
});

export type MeetingFormData = z.infer<typeof meetingSchema>;
