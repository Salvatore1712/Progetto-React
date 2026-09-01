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
                <section className={style.hero}>
                    <div className={style.hero__content}>
                        <h2 className={style.titleSmall}>Ritrova il tuo</h2>
                        <h1 className={style.title}>Equilibrio</h1>
                        <p className={style.textHero}>Prenditi qualche minuto per respirare, meditare e rallentare</p>
                        <div className={style.hero__actions}>
                            <ButtonCTA testo={"Inizia la meditazione ➜"} path={"/meditazione"}></ButtonCTA>
                            <ButtonOutline testo={"Respira con Numa ➜"} path={"/respiro"}></ButtonOutline>
                        </div>
                    </div>
                    <img src={imageHero} className={style.imageHero} alt="Illustrazione di una persona che medita" />
                </section>

                <section className={style.intro}>
                    <h3>Un momento per te, ogni giorno</h3>
                    <p className={style.textHero}>Non serve molto per ritrovare il tuo equilibrio.
                        Scegli tra meditazione, respirazione e percorsi guidati, e lascia che Numa ti accompagni in una pausa dedicata al tuo benessere.</p>
                </section>

                <div className={style.cardWrapper}>
                    <CardsLink
                        urlSrc={iconaRespito}
                        label={"Respirazione guidata"}
                        title={"Respira"}
                        testo={"Bastano pochi minuti per rallentare il battito e sciogliere la tensione. Numa ti guida con un ritmo visivo semplice da seguire, ovunque tu sia."}
                        points={["Cicli 4-4-6 per calmare corpo e mente", "Animazione che detta il ritmo del respiro", "Perfetta prima di dormire o nei momenti di stress"]}
                        ctaLabel={"Inizia a respirare"}
                        path={"/respiro"}
                    ></CardsLink>
                    <CardsLink
                        urlSrc={iconaMedita}
                        label={"Meditazione libera"}
                        title={"Medita"}
                        testo={"Ritagliati uno spazio tutto tuo, senza obiettivi da raggiungere. Scegli quanto tempo dedicarti e lascia che i pensieri passino, un respiro alla volta."}
                        points={["Sessioni da 5 a 30 minuti", "Campana finale e promemoria gentili", "Un momento di calma da riprendere ogni giorno"]}
                        ctaLabel={"Inizia a meditare"}
                        path={"/meditazione"}
                    ></CardsLink>
                </div>
                <Footer></Footer>
            </div>
        </>
    )
}
