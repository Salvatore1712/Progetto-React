//COMPONENTE PRINCIPALE PAGINA DELLE RICETTE

import RicetteAPI from "../components/RicetteAPI"
import style from "./ricette.module.scss"


export default function Ricette(){
    return(
        <div className="container">
            <RicetteAPI></RicetteAPI>
        </div>
    )
}