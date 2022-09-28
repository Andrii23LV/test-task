import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./setEdits";

export default configureStore({
  reducer: {
    edited: counterReducer
  }
});
