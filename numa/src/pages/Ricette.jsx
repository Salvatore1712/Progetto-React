//COMPONENTE PRINCIPALE PAGINA DELLE RICETTE

import Footer from "../components/Footer"
import RicetteAPI from "../components/RicetteAPI"
import style from "./ricette.module.scss"


export default function Ricette(){
    return(
        <div className={style.container}>
            <div className={style.content}>
                <div className={style.titleWrap}>
                    <h1 className={style.title}>Ricetta</h1>
                    <h2 className={style.title__small}>Ricette per nutrire corpo e mente</h2>
                    <p className={style.text}>Scopri la ricetta del giorno! Sana, gustosa e bilanciata
                        per accompagnare il tuo percorso di benessere.</p>
                </div>

                <RicetteAPI></RicetteAPI>
            </div>

            <Footer></Footer>
        </div>
    )
}
