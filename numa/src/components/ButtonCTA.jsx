import { Link } from "react-router"
import style from "./buttonCta.module.scss"


export default function ButtonCTA({testo, path}){
    return(
        <>
            <Link className={style.btn} to={path}>{testo}</Link>
        </>
        
    )
}