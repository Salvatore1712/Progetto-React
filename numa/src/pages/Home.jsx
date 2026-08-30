//import modulo di stile
import style from "../pages/_home.module.scss";
import imageHero from "../assets/image-hero-mobile.png"
import ButtonCTA from "../components/ButtonCTA";
import ButtonOutline from "../components/ButtonOutline";
import Footer from "../components/Footer";

export default function Home () {
    return(
        <>
            <div className={style.container}>
                <div className={style.item}>
                    <div className={style.titleWrap}>
                        <h2 className={style.titleSmall}>Ritrova il tuo</h2>
                        <h1 className={style.title}>Equilibrio</h1>
                    </div>
                    <img src={imageHero} className={style.imageHero}></img>
                    <p className={style.textHero}>Prenditi qualche minuto per respirare, meditare e rallentare</p>
                </div>
                <div className={style.item}>
                    <ButtonCTA testo={"Inizia la meditazione ➜"} path={"/meditazione"}></ButtonCTA>
                    <ButtonOutline testo={"Respira con Numa ➜"} path={"/respiro"}></ButtonOutline>
                </div>
                <div className={style.item}></div>
                <div className={style.item}>
                    <h3>Un momento per te, ogni giorno</h3>
                    <p className={style.textHero}>Non serve molto per ritrovare il tuo equilibrio.
                        Scegli tra meditazione, respirazione e percorsi guidati, e lascia che Numa ti accompagni in una pausa dedicata al tuo benessere.</p>
                        <Footer></Footer>
                </div>
                
            </div>
            
        </>
    )
}