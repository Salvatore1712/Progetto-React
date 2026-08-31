//Componente riutilizzabile per la ricetta del giorno

import { useEffect, useState } from "react"
import richiestaRicetteAPI from "../api/ricette"

export default function RicetteAPI() {
    const [ricetta, setRicetta] = useState(null)

    useEffect(()=>{
        async function fetchRicetta() {
            const risp = await richiestaRicetteAPI()
            setRicetta(risp)
        }
        fetchRicetta()
    },[])
    return(
        <>
        <p>{ricetta ? ricetta.nomeRicetta : (<p>Caricamento ricetta</p>)}</p>
        <p>{ricetta ? ricetta.linkRicetta : (<p>Nessun link disponibile</p>)}</p>
        <p>{ricetta ? ricetta.istruzRicetta : (<p>"-"</p>)}</p>
        </>
        
    )
}