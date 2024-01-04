import { createSlice } from "@reduxjs/toolkit";
import { typesBusiness } from "../../types/types-user";

const initialState: { value: typesBusiness | null } = {
  // ... valores iniciales para otras propiedades de estado si las tienes
  value: null,
};

export const activitySelect = createSlice({
  name: "activity",
  initialState,
  reducers: {
    // Redux Toolkit allows us to write "mutating" logic in reducers. It
    // doesn't actually mutate the state because it uses the Immer library,
    // which detects changes to a "draft state" and produces a brand new
    // immutable state based off those changes
    ActivityAdd: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { ActivityAdd } = activitySelect.actions;

export default activitySelect.reducer;
