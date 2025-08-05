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

interface MeetingState {
    meetings: Meeting[];
}

const initialState: MeetingState = {
    meetings: [
          {
    date: "2025-08-15T10:30:00", 
    type: "Client Meeting",
    agenda: "Discuss project requirements",
    mom: "Client explained scope, team asked questions.",
    actionPoints: "Prepare proposal by next week.",
    assignedTo: "Prajwal",
    followUps: [
      {
        date: "2025-08-20",
        summary: "Proposal shared with client."
      }
    ]
  },
  {
    date: "2024-11-02T14:00:00", 
    type: "Team Review",
    agenda: "Sprint retrospective and feedback",
    mom: "Reviewed completed tasks, discussed blockers.",
    actionPoints: "Improve deployment pipeline.",
    assignedTo: "Sahil",
    followUps: [
      {
        date: "2024-11-05",
        summary: "CI/CD reviewed and documented."
      }
    ]
  }

    ],
};

const meetingSlice = createSlice({
    name: "meeting",
    initialState,
    reducers: {
        addMeeting: (state, action: PayloadAction<Meeting>) => {
            state.meetings.push(action.payload);
        },
        addTheFollowUpToMeeting: (
            state,
            action: PayloadAction<{
                index: number; followUp: {
                    date: string; summary
                        : string
                }
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
export default meetingSlice.reducer;
