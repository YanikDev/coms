import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { VisitorFormData, FollowUpData } from "../../schema/visitorSchema";

interface VisitorState {
  data: VisitorFormData[];
}

const initialState: VisitorState = {
    data: [
        {
            name: "Balu Gayake",
            contact: "1234567890",
            visit_date: new Date("2024-06-01"),
            purpose: "Inquiry",
            status:"Pending",
            followUps: [
                {
                    date: "2024-06-02",
                    summary: "Called for more info",
                },
            ],
        },
        {
            name: "Prasad Patil",
            contact: "1234567890",
            status:"Pending",
            visit_date: new Date("2024-06-03"),
            purpose: "Support",
            followUps: [],
        },
    ],
};

const formSlice = createSlice({
  name: "visitorForm",
  initialState,
  reducers: {
    addVisitor: (state, action: PayloadAction<VisitorFormData>) => {
      state.data.push(action.payload);
    },
    updateVisitor: (
      state,
      action: PayloadAction<{ index: number; data: VisitorFormData }>
    ) => {
      state.data[action.payload.index] = action.payload.data;
    },
    addFollowUpToVisitor: (
      state,
      action: PayloadAction<{ index: number; followUp: FollowUpData }>
    ) => {
      const visitor = state.data[action.payload.index];
      if (visitor) {
        if (!visitor.followUps) {
          visitor.followUps = [];
        }
        visitor.followUps.push(action.payload.followUp);
      }
    },
  },
});

export const { addVisitor, updateVisitor, addFollowUpToVisitor } = formSlice.actions;
export default formSlice.reducer;
