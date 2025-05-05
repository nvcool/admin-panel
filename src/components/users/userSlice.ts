import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPagination } from "../../types/IPagination";

const initialState: IPagination = {
  page: 1,
  limit: 10,
};

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    prevPage: (state) => {
      if (state.page > 1) {
        state.page -= 1;
      }
    },
    nextPage: (state) => {
      state.page += 1;
    },
    setLimit: (state, action: PayloadAction<number>) => {
      state.limit = action.payload;
    },
  },
});

export const { prevPage, nextPage, setLimit } = userSlice.actions;
export default userSlice.reducer;
