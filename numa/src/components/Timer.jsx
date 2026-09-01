import { useDispatch, useSelector } from "react-redux";
import style from "./timer.module.scss";
import { aggiungi_secondi, pausa, start, reset, tick } from "../slice/timerSlice";
import { useEffect, useRef } from "react";
import {useGSAP} from "@gsap/react"
import gsap from "gsap";

gsap.registerPlugin(useGSAP)

//Componente
export default function Timer(){

const {seconds, isRunning} = useSelector((state)=>state.timer) //seleziona lo store del timer
const dispatch = useDispatch()

//riferimenti agli elementi da animare
const counterBoxRef = useRef(null)

//conversione da secondi a minuti per la visualizzazione
const mm = String(Math.floor(seconds / 60)).padStart(2, "0") //minuti
const ss = String(seconds % 60).padStart(2, "0") // seecondi
const minuti = `${mm}:${ss}` //stringa toto minuti + seconfi

//avvio del timer con setIntervall
useEffect(()=>{
    if(!isRunning) return //se fermo non avviare conteggio

    const id = setInterval(()=>{
            dispatch(tick())
    }, 1000)

    //cancella intrevall
    return ()=>clearInterval(id)
}, [isRunning, dispatch])

// ****** respiro continuo del box mentre il timer scorre ******
useGSAP(() => {
    if (!isRunning) {
        //ritorno morbido allo stato di riposo quando si mette in pausa
        gsap.to(counterBoxRef.current, {
            scale: 1,
            boxShadow: "0 8px 30px rgba(74, 58, 94, 0.15)",
            duration: 0.8,
            ease: "sine.out",
        })
        return
    }

    const respiro = gsap.timeline({ repeat: -1, yoyo: true })
    respiro.to(counterBoxRef.current, {
        scale: 1.05,
        boxShadow: "0 14px 44px rgba(115, 85, 141, 0.28)",
        duration: 4,
        ease: "sine.inOut",
    })

    return () => respiro.kill()
}, { dependencies: [isRunning], scope: counterBoxRef })


    //componente
    return(
        <div className={style.container}>
            <div className={style.timer}>
                <button className={style.timer__tempi} onClick={()=>dispatch(aggiungi_secondi(300))}>5<span>min</span></button>
                <button className={style.timer__tempi} onClick={()=>dispatch(aggiungi_secondi(600))}>10<span>min</span></button>
                <button className={style.timer__tempi} onClick={()=>dispatch(aggiungi_secondi(900))}>15<span>min</span></button>
                <button className={style.timer__tempi} onClick={()=>dispatch(aggiungi_secondi(1200))}>20<span>min</span></button>
                <button className={style.timer__tempi} onClick={()=>dispatch(aggiungi_secondi(1800))}>30<span>min</span></button>
            </div>
            <div className={style.counterBox} ref={counterBoxRef}>
                <p className={style.minuti}>{minuti}</p>
            </div>
            <div className={style.buttonBox}>
                <button className={style.buttonBox__btn} onClick={()=>dispatch(start())}>►</button>
                <button className={style.buttonBox__btn} onClick={()=>dispatch(pausa())}>𑫨</button>
                <button className={style.buttonBox__btn} onClick={()=>dispatch(reset())}>Reset</button>
            </div>
            
        </div>

    )
}