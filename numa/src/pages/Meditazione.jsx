import ButtonCTA from "../components/ButtonCTA";
import Footer from "../components/Footer";
import Timer from "../components/Timer";
import style from "./_meditazione.module.scss";


export default function Meditazione() {
    return (
        <div className={style.container}>
            <div className={style.titleWrap}>
                <h1 className={style.title}>Meditazione</h1>
                <p className={style.text}>Scegli la durata della tua sessione</p>
            </div>
            <Timer></Timer>
            <br />
            <ButtonCTA testo={"Torna alla home ➜"} path={"/"}></ButtonCTA>
            <br /><br />
            <Footer></Footer>
        </div>
    )
}
