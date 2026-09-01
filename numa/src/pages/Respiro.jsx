//import foglio di stile
import TimerRespiro from "../components/TimerRespiro"
import styleResp from "./respiro.module.scss"
import imageRespiro from "../assets/image-respiro.png"
import Footer from "../components/Footer"
import ButtonCTA from "../components/ButtonCTA"



export default function Respiro() {
    return (
        <div className={styleResp.container}>
            <div className={styleResp.content}>
                <div className={styleResp.titleWrap}>
                    <h1 className={styleResp.title}>Respiro</h1>
                    <p className={styleResp.text}>Scegli il ritmo, inspira, trattieni ed espira</p>
                </div>

                <div className={styleResp.panel}>
                    <TimerRespiro></TimerRespiro>
                </div>

                <section className={styleResp.info}>
                    <img src={imageRespiro} alt="mascotte che respira felice" className={styleResp.image} />
                </section>

                <section className={styleResp.reflection}>
                    <h2 className={styleResp.subtitle}>Un respiro dopo l’altro, senza fretta</h2>
                    <p className={styleResp.text}>Inspira per quattro secondi, trattieni per quattro, espira per sei.
                        Segui il cerchio con lo sguardo e lascia che il ritmo faccia il resto:
                        bastano pochi cicli per sentirti più calmo e presente.</p>
                    <ButtonCTA testo={"Torna alla home ➜"} path={"/"}></ButtonCTA>
                </section>
            </div>

            <Footer></Footer>
        </div>
    )
}
