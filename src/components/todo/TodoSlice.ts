import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPagination } from "../../types/IPagination";

const initialState: IPagination = {
  page: 1,
  limit: 10,
};

export const todoPaginationSlice = createSlice({
  name: "todoPagination",
  initialState,
  reducers: {
    nextPage: (state) => {
      state.page += 1;
    },
    prevPage: (state) => {
      if (state.page > 1) {
        state.page -= 1;
      }
    },
    setLimit: (state, action: PayloadAction<number>) => {
      state.limit = action.payload;
      state.page = 1;
    },
  },
});

export const { nextPage, prevPage, setLimit } = todoPaginationSlice.actions;
export default todoPaginationSlice.reducer;
