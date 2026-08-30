//import modulo di stile
import style from "../pages/_home.module.scss";
import imageHero from "../assets/image-hero-mobile.png"
import ButtonCTA from "../components/ButtonCTA";
import { Link } from "react-router";

export default function Home () {
    return(
        <div className={style.container}>
            <div className={style.item}>
                <div className={style.titleWrap}>
                    <h2 className={style.titleSmall}>Ritrova il tuo</h2>
                    <h1 className={style.title}>Equilibrio</h1>
                </div>
                <img src={imageHero} className={style.imageHero}></img>
            </div>
            <div className={style.item}>
                <ButtonCTA testo={"Inizia la meditazione ➜"} path={"/meditazione"} clasName={".btn"}></ButtonCTA>
            </div>
            <div className={style.item}>xx</div>
            <div className={style.item}>xx</div>
            <div className={style.item}>xx</div>
            <div className={style.item}>xx</div>

        </div>
    )
}