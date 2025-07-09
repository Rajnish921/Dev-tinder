// utils/RequestsSlice.js
import { createSlice } from "@reduxjs/toolkit";

const requestsSlice = createSlice({
  name: "requests",
  initialState: [], // <-- should be an array
  reducers: {
    addRequests: (state, action) => action.payload,
    removeRequests: () => [],
  },
});

export const { addRequests, removeRequests } = requestsSlice.actions;
export default requestsSlice.reducer;
