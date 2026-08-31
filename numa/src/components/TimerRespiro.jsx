import { useDispatch, useSelector } from "react-redux";
import { avvia, reset, pausa } from "../slice/timerRespiroSlice";

//import stile
import style from "./timerRespiro.module.scss"
import { useEffect, useState } from "react";

//Componente timer per pagina respiro
export default function TimerRespiro () {
    const {seconds, isRunning} = useSelector((state)=> state.timerRespiro)
    const dispatch = useDispatch()

    //testo timer
    const [testoResp, setTestoResp] = useState("")

    useEffect(()=> {
        if(!isRunning) return
        const id = setInterval(()=> {
            dispatch(avvia())
            setTestoResp("Respira")
        }, 1000)
        return ()=> clearInterval(id) //cancella setIntervall..

    }, [isRunning, dispatch])

    return (
        //timer
        <div className={style.respBox}>
            <div className={style.cerchioWrap}>
                <div className={style.cerchio}></div>
                <div className={style.cerchio__2}></div>
                <div className={style.cerchio__3}></div>
                <p className={style.secondi}>{seconds}</p>
            </div>
            <p>{testoResp}</p>
            <div className={style.boxButton}>
                <button onClick={()=>dispatch(avvia())} className={style.btn}>Avvia</button>
                <button onClick={()=>dispatch(pausa())} className={style.btn__outline}>Pausa</button>
                <button onClick={()=>dispatch(reset())} className={style.btn__outline}>Reset</button>
            </div>
            
        </div>
    )
}