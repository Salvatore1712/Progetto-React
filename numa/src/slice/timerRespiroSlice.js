import { createSlice } from "@reduxjs/toolkit";

const timerRespiroSlice = createSlice({
    name: "timerRespiro",
    initialState: {
        seconds: 0,
        isRunning: false,
        testo: ""
    },
    reducers: {
        avvia: (state)=>{
            state.isRunning = true //avvia isRunning
            state.seconds += 1
        },
        pausa: (state)=> {
            state.isRunning = false
        },
        reset: (state)=> {
            state.isRunning = false
        },
    }
})

export const {avvia, pausa, reset, setTesto} = timerRespiroSlice.actions
export default timerRespiroSlice.reducer