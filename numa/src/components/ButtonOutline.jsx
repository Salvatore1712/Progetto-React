import { Link } from "react-router"
import style from "./_buttonCta.module.scss"


export default function ButtonOutline({testo, path}){
    return(
        <>
            <Link className={style.btn__outline} to={path}>{testo}</Link>
        </>
        
    )
}