import style from "./_footer.module.scss"
import logoSalvatore from "../assets/logo-SDR-black.png"
import { Link } from "react-router"


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