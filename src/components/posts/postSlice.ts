import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPagination } from "../../types/IPagination";

const initialState: IPagination = {
  page: 1,
  limit: 10,
};

const postSlice = createSlice({
  name: "postSlice",
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

export const { prevPage, nextPage, setLimit } = postSlice.actions;
export default postSlice.reducer;
