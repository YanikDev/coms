import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";

interface Meeting {
  date: string;
  type: string;
  agenda: string;
  mom: string;
  actionPoints: string;
  assignedTo: string;
  followUps?: {
    date: string;
    summary: string;
  }[];
}
interface Notifications {
  date: string;
  message: string;
  type: "info" | "warning" | "error";
  timestamp: string;
  userId?: string; // Optional field for user-specific notifications
}
interface MeetingState {
  meetings: Meeting[];
  notifications: Notifications[];
}

const initialState: MeetingState = {
  meetings: [
    {
      date: "2025-08-15T10:30:00",
      type: "Client Meeting",
      agenda: "Discuss project requirements",
      mom: "Client explained scope, team asked questions.",
      actionPoints: "Prepare proposal by next week.",
      assignedTo: "2",
      followUps: [
        {
          date: "2025-08-20",
          summary: "Proposal shared with client.",
        },
      ],
    },
    {
      date: "2024-11-02T14:00:00",
      type: "Team Review",
      agenda: "Sprint retrospective and feedback",
      mom: "Reviewed completed tasks, discussed blockers.",
      actionPoints: "Improve deployment pipeline.",
      assignedTo: "1",
      followUps: [
        {
          date: "2024-11-05",
          summary: "CI/CD reviewed and documented.",
        },
      ],
    },
  ],
  notifications: [],
};

const meetingSlice = createSlice({
  name: "meeting",
  initialState,
  reducers: {
    addMeeting: (state, action: PayloadAction<Meeting>) => {
      state.meetings.push(action.payload);
      const notification: Notifications = {
        date: action.payload.date,
        message: `New meeting added on ${action.payload.date}`,
        type: "info",
        timestamp: new Date().toISOString(),
        userId: action.payload.assignedTo,
      };
      state.notifications.push(notification);
    },
    addTheFollowUpToMeeting: (
      state,
      action: PayloadAction<{
        index: number;
        followUp: {
          date: string;
          summary: string;
        };
      }>
    ) => {
      const meeting = state.meetings[action.payload.index];
      if (meeting) {
        if (!meeting.followUps) {
          meeting.followUps = [];
        }
        meeting.followUps.push(action.payload.followUp);
      }
    },
  },
});

export const { addMeeting, addTheFollowUpToMeeting } = meetingSlice.actions;
export const selectMeetingByIndex = (index: number) => (state: RootState) =>
  state.meeting.meetings[index];
export const selectedMeetingsBasedOnUserId =
  (userId: string, type: "admin" | "user" = "user") =>
  (state: RootState) =>
    type === "admin"
      ? state.meeting.meetings
      : state.meeting.meetings.filter(
          (meeting) => meeting.assignedTo === userId
        );
export const selectNotifications = (userId?: string) => (state: RootState) =>
  userId
    ? state.meeting.notifications.filter(
        (notification) => notification.userId === userId
      )
    : state.meeting.notifications;
export const selectMeetingByDate = (date: string) => (state: RootState) =>
  state.meeting.meetings.find((meeting) => meeting.date === date);
export default meetingSlice.reducer;
