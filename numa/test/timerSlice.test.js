// Test dei reducer dello slice Redux del timer meditazione (src/slice/timerSlice.js).
// Sono funzioni pure: dato uno stato e un'azione, restituiscono il nuovo stato.
// Nessun componente React, nessun DOM: si testano solo le transizioni di stato.

import { describe, it, expect } from "vitest"
import reducer, {
    aggiungi_secondi,
    start,
    pausa,
    reset,
    tick,
} from "../src/slice/timerSlice"

const statoIniziale = { seconds: 0, isRunning: false }

describe("timerSlice", () => {
    it("restituisce lo stato iniziale", () => {
        expect(reducer(undefined, { type: "@@INIT" })).toEqual(statoIniziale)
    })

    it("aggiungi_secondi somma i secondi passati come payload", () => {
        const stato = reducer(statoIniziale, aggiungi_secondi(300))
        expect(stato.seconds).toBe(300)

        // due click consecutivi si sommano (5 + 10 minuti)
        const stato2 = reducer(stato, aggiungi_secondi(600))
        expect(stato2.seconds).toBe(900)
    })

    it("start NON avvia il timer se i secondi sono 0", () => {
        const stato = reducer(statoIniziale, start())
        expect(stato.isRunning).toBe(false)
    })

    it("start avvia il timer se ci sono secondi impostati", () => {
        const stato = reducer({ seconds: 300, isRunning: false }, start())
        expect(stato.isRunning).toBe(true)
    })

    it("tick decrementa di un secondo mentre il timer scorre", () => {
        const stato = reducer({ seconds: 5, isRunning: true }, tick())
        expect(stato.seconds).toBe(4)
    })

    it("tick a 0 ferma il timer da solo", () => {
        const stato = reducer({ seconds: 0, isRunning: true }, tick())
        expect(stato).toEqual({ seconds: 0, isRunning: false })
    })

    it("pausa ferma il conteggio senza azzerare i secondi", () => {
        const stato = reducer({ seconds: 120, isRunning: true }, pausa())
        expect(stato).toEqual({ seconds: 120, isRunning: false })
    })

    it("reset riporta tutto allo stato iniziale", () => {
        const stato = reducer({ seconds: 120, isRunning: true }, reset())
        expect(stato).toEqual(statoIniziale)
    })
})
