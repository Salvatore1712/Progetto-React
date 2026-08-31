//Componente riutilizzabile per la ricetta del giorno

import { useEffect, useState } from "react"
import richiestaRicetteAPI from "../api/ricette"
import style from "./ricetteApi.module.scss"
import { Link } from "react-router"

export default function RicetteAPI() {
    const [ricetta, setRicetta] = useState(null)

    useEffect(()=>{
        async function fetchRicetta() {
            const risp = await richiestaRicetteAPI()
            setRicetta(risp)
        }
        fetchRicetta()
    },[])

    //componente
    return(
        <div className={style.containerRicetta}>
            <p className={style.titleRicetta}>{ricetta ? ricetta.nomeRicetta : "Caricamento ricetta"}</p>
            <img src={ricetta ?ricetta.imgUrl : "immagine non disponibile" } className={style.imageRicetta}></img>
            <Link to={ricetta ? ricetta.linkRicetta : "Nessun link disponibile"} className={style.btnVideo}>Guarda il video ▶</Link>
            <p className={style.textRIcetta}>{ricetta ? ricetta.istruzRicetta : "-"}</p>
        </div>
    )
}