// Test della funzione che chiama l'API delle ricette (src/api/ricette.js).
// Axios viene "mockato": nessuna richiesta di rete parte davvero,
// si verifica solo che la funzione usi l'endpoint giusto e restituisca
// un oggetto pulito con i soli campi utili.

import { describe, it, expect, vi, beforeEach } from "vitest"
import axios from "axios"
import richiestaRicetteAPI from "../src/api/ricette"

// sostituisce il modulo axios con un finto { default: { get: fn } }
vi.mock("axios", () => ({
    default: { get: vi.fn() },
}))

// risposta finta nel formato di TheMealDB (meals = array con 1 elemento)
const rispostaFinta = {
    data: {
        meals: [
            {
                strMeal: "Spaghetti Carbonara",
                strYoutube: "https://www.youtube.com/watch?v=abc123",
                strInstructions: "Passo 1. Passo 2. Passo 3.",
                strMealThumb: "https://www.themealdb.com/images/media/meals/carbonara.jpg",
                // campi extra che la funzione deve ignorare
                idMeal: "52999",
                strArea: "Italian",
                strIngredient1: "Spaghetti",
            },
        ],
    },
}

describe("richiestaRicetteAPI", () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it("chiama l'endpoint random di TheMealDB", async () => {
        axios.get.mockResolvedValue(rispostaFinta)

        await richiestaRicetteAPI()

        expect(axios.get).toHaveBeenCalledTimes(1)
        expect(axios.get).toHaveBeenCalledWith(
            "https://www.themealdb.com/api/json/v1/1/random.php"
        )
    })

    it("estrae solo i 4 campi utili dalla risposta", async () => {
        axios.get.mockResolvedValue(rispostaFinta)

        const ricetta = await richiestaRicetteAPI()

        expect(ricetta).toEqual({
            nomeRicetta: "Spaghetti Carbonara",
            linkRicetta: "https://www.youtube.com/watch?v=abc123",
            istruzRicetta: "Passo 1. Passo 2. Passo 3.",
            imgUrl: "https://www.themealdb.com/images/media/meals/carbonara.jpg",
        })
        // si assicura che i campi extra non finiscano nell'oggetto
        expect(ricetta).not.toHaveProperty("idMeal")
        expect(ricetta).not.toHaveProperty("strArea")
    })

    it("propaga l'errore se la richiesta HTTP fallisce", async () => {
        axios.get.mockRejectedValue(new Error("Network Error"))

        await expect(richiestaRicetteAPI()).rejects.toThrow("Network Error")
    })
})
