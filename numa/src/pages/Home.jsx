//import modulo di stile
import style from "../pages/home.module.scss";
import imageHero from "../assets/image-hero-mobile_2.png"
import ButtonCTA from "../components/ButtonCTA";
import ButtonOutline from "../components/ButtonOutline";
import Footer from "../components/Footer";
import iconaRespito from "../assets/icona-respiro.png"
import iconaMedita from "../assets/icona-medita.png"
import CardsLink from "../components/CardsLink";

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
                <div className={style.item}>
                    <h3>Un momento per te, ogni giorno</h3>
                    <p className={style.textHero}>Non serve molto per ritrovare il tuo equilibrio.
                        Scegli tra meditazione, respirazione e percorsi guidati, e lascia che Numa ti accompagni in una pausa dedicata al tuo benessere.</p>
                </div>
                <div className={style.cradWarapper}>
                    <CardsLink urlSrc={iconaRespito} title={"Respira"} testo={"Trova qualche minuto di silenzio e concentrazione"} path={"/respiro"}></CardsLink>
                    <CardsLink urlSrc={iconaMedita} title={"Medita"} testo={"Segui il ritmo del tuo respiro e ritrova la calma"} path={"/meditazione"}></CardsLink>
                </div>
                <Footer></Footer>
            </div>
            
        </>
    )
}