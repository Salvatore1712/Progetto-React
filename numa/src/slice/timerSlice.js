import { createSlice } from "@reduxjs/toolkit"

const timerSlice = createSlice({
    name: "timer",
    initialState: {seconds: 0, isRunning: false},
    reducers: {
        aggiungi_secondi: (state, action)=> {
            state.seconds += action.payload
        },
        start: (state)=> {
            if(state.seconds===0){
                return
            }
            state.isRunning = true
        },
        pausa: (state)=> {
            state.isRunning = false
        },
        reset: (state)=> {
            state.seconds = 0;
            state.isRunning = false
        },
        tick: (state)=>{
            if(state.seconds===0){
                state.isRunning = false;
                return
            }
            state.seconds -=1
        }
    }
})

export const {aggiungi_secondi, start, pausa, reset, tick} = timerSlice.actions
export default timerSlice.reducer
