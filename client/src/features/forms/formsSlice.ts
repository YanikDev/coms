import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { VisitorFormData } from "../../schema/visitorSchema";


interface VisitorState {
  data: VisitorFormData[];
}

const initialState: VisitorState = {
  data: [],
};

const formSlice = createSlice({
  name: "visitorForm",
  initialState,
  reducers: {
    addVisitor: (state, action: PayloadAction<VisitorFormData>) => {
      state.data.push(action.payload);
    },
    updateVisitor: (state, action: PayloadAction<{ index: number; data: VisitorFormData }>) => {
      state.data[action.payload.index] = action.payload.data;
    },
  },
});

export const { addVisitor, updateVisitor } = formSlice.actions;
export default formSlice.reducer;
