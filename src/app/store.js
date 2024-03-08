import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "../components/HomeSlice";

export const store = configureStore({
  reducer: {
    fileData: dataReducer,
  },
});
