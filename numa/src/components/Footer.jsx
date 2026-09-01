import style from "./footer.module.scss" //modulo stile
import logoSalvatore from "../assets/logo-SDR-black.png" //logo SDR
import { Link } from "react-router"

// *** COMPONENTE FOOTER
export default function Footer(){
    return(
    <>
    <footer className={style.footer}>
        <div>
            <Link to={"https://www.salvatorederoma.it"} target="blank">
                <img src={logoSalvatore} alt="salvatore de roma web developer" />
            </Link>
        </div>
        <p>start2impact project 2026</p>
    </footer>
    </>
    )
}