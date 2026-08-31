
// funzione chiamata API delle ricette tramite axios
// endpoint randomico!!!

import axios from "axios";

const EP_RICETTE_RANDOM = "https://www.themealdb.com/api/json/v1/1/random.php"

async function richiestaRicetteAPI() {
    const risposta = await axios.get(EP_RICETTE_RANDOM);
    let ricetta = risposta.data.meals[0]
    const nomeRicetta = ricetta.strMeal; //nome ricetta
    const linkRicetta = ricetta.strYoutube //link video
    const istruzRicetta = ricetta.strInstructions; //istruzioni

    return {nomeRicetta, linkRicetta, istruzRicetta}
}

//export funzione
export default richiestaRicetteAPI