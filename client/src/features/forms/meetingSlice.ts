import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
    meetings: [],
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
export default meetingSlice.reducer;
