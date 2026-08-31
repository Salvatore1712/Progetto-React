import { configureStore } from "@reduxjs/toolkit";
import timerSlice from "../slice/timerSlice"
import timerRespiroSlice from "../slice/timerRespiroSlice"

export const store = configureStore({
    reducer: {
        timer: timerSlice,
        timerRespiro: timerRespiroSlice
    },
})

export default store
