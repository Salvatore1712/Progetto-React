import ButtonCTA from "../components/ButtonCTA";
import Footer from "../components/Footer";
import Timer from "../components/Timer";
import style from "./meditazione.module.scss";
import imageMeditazione from "../assets/image-meditazione.png"


export default function Meditazione() {
    return (
        <div className={style.container}>
            <div className={style.content}>
                <div className={style.titleWrap}>
                    <h1 className={style.title}>Meditazione</h1>
                    <p className={style.text}>Scegli la durata della tua sessione</p>
                </div>

                <div className={style.panel}>
                    <Timer></Timer>
                </div>

                <img src={imageMeditazione} alt="immagine mascotte che medita" className={style.image} />

                <section className={style.reflection}>
                    <h2 className={style.subtitle}>Lascia andare, un respiro alla volta</h2>
                    <p className={style.text}>Non devi raggiungere un risultato né liberare completamente la mente.
                        Lascia che i pensieri arrivino e vadano, senza trattenerli.
                        Riporta gentilmente l’attenzione al respiro e concediti questo momento, senza fretta.</p>
                    <ButtonCTA testo={"Torna alla home ➜"} path={"/"}></ButtonCTA>
                </section>
            </div>

            <Footer></Footer>
        </div>
    )
}
