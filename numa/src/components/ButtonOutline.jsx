import { Link } from "react-router"
import style from "./buttonCta.module.scss" //modulo stile

// COMPONENTE BOTTONE OUTLINE
export default function ButtonOutline({testo, path}){
    return(
        <>
            <Link className={style.btn__outline} to={path}>{testo}</Link>
        </>
        
    )
}