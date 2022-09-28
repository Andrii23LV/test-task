import { createSlice } from "@reduxjs/toolkit";

export const setEdits = createSlice({
  name: "edited",
  initialState: {
    name: '',
  },
  reducers: {
    SET_EDITED: (state, data) => {
        state.name = data.payload.name;
      }
  }
});

export const { SET_EDITED } = setEdits.actions;

export default setEdits.reducer;