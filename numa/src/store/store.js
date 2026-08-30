import { configureStore } from "@reduxjs/toolkit";
import timerSlice from "../slice/timerSlice"

export const store = configureStore({
    reducer: {
        timer: timerSlice,
    },
})

export default store
