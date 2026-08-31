//import foglio di stile
import TimerRespiro from "../components/TimerRespiro"
import styleResp from "./_respiro.module.scss"
import imageRespiro from "../assets/image-respiro.png"
import Footer from "../components/Footer"


export default function Respiro() {
    return (
        <div className={styleResp.container}>
            <div className={styleResp.titleWrap}>
                <h1 className={styleResp.title}>Respiro</h1>
                <p className={styleResp.text}>Scegli il ritmo, inspira, trattieni ed espira</p>
            </div>
            <TimerRespiro></TimerRespiro>
            <section className={styleResp.info}>
                <img src={imageRespiro} alt="mascotte che respira felice" />
                <h3>Lasciati inpirare dalla frasew del giorno</h3>
            </section>
            <Footer></Footer>
        </div>
    )
}
