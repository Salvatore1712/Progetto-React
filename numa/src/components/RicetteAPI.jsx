
import { useEffect, useState } from "react"
import richiestaRicetteAPI from "../api/ricette"
import style from "./ricetteApi.module.scss"

// *** Componente riutilizzabile per la ricetta del giorno
export default function RicetteAPI() {
    const [ricetta, setRicetta] = useState(null)

    useEffect(()=>{
        async function fetchRicetta() {
            const risp = await richiestaRicetteAPI()
            setRicetta(risp)
        }
        fetchRicetta()
    },[])

    //componente return
    return(
        <div className={style.containerRicetta}>
            <p className={style.titleRicetta}>{ricetta ? ricetta.nomeRicetta : "Caricamento ricetta"}</p>
            {ricetta && (
                <img src={ricetta.imgUrl} alt={ricetta.nomeRicetta} className={style.imageRicetta} />
            )}
            {ricetta?.linkRicetta && (
                // link esterno a YouTube: <a> normale, non <Link> di react-router
                <a
                    href={ricetta.linkRicetta}
                    className={style.btnVideo}
                    target="_blank"
                    rel="noreferrer"
                >
                    Guarda il video ▶
                </a>
            )}
            <p className={style.textRIcetta}>{ricetta ? ricetta.istruzRicetta : "-"}</p>
        </div>
    )
}