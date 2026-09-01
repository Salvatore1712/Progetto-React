# Numa · Meditazione

App web per ritrovare il proprio equilibrio con brevi sessioni di **meditazione**,
**respirazione guidata** e una **ricetta del giorno** presa da un'API pubblica.

Progetto di studio del percorso **start2impact – modulo React**. L'obiettivo non era
solo costruire un'interfaccia, ma imparare a ragionare "a componenti": isolare le
responsabilità, far scorrere i dati con le props, gestire lo stato con gli hook e —
dove serve davvero — con uno store globale.

---

## Indice

- [Cosa ho imparato](#cosa-ho-imparato)
- [Stack tecnologico](#stack-tecnologico)
- [Avvio del progetto](#avvio-del-progetto)
- [Struttura delle cartelle](#struttura-delle-cartelle)
- [Architettura dell'app](#architettura-dellapp)
- [Routing](#routing)
- [I componenti e la loro logica](#i-componenti-e-la-loro-logica)
- [Gestione dello stato con Redux Toolkit](#gestione-dello-stato-con-redux-toolkit)
- [Stili: SCSS Modules e design tokens](#stili-scss-modules-e-design-tokens)
- [Pagina Ricette + Axios](#pagina-ricette--axios)
- [Test](#test)
- [Possibili sviluppi futuri](#possibili-sviluppi-futuri)
- [Crediti](#crediti)

---

## Cosa ho imparato

| Tema | Dove lo si vede nel progetto |
|---|---|
| Componenti funzionali e composizione | tutta `src/components`, pagine che assemblano componenti |
| Props come contratto in ingresso | `ButtonCTA`, `ButtonOutline`, `CardsLink` |
| Rendering di liste con `.map()` e `key` | elenco dei punti in `CardsLink` |
| Rendering condizionale | stato di caricamento in `RicetteAPI` |
| `useState` per lo stato locale | menu dell'header, testo del timer respiro |
| `useEffect` + cleanup | `setInterval` dei timer, fetch al mount |
| `useRef` per riferire nodi del DOM | animazioni GSAP nell'header e nel timer |
| Stato globale con Redux Toolkit | `timerSlice`, `timerRespiroSlice`, `store` |
| `useSelector` / `useDispatch` | componenti `Timer` e `TimerRespiro` |
| Routing lato client | `react-router` in `App.jsx` e `Header` |
| Chiamate HTTP con Axios | `src/api/ricette.js` |
| CSS a scope locale | SCSS Modules `*.module.scss` |

---

## Stack tecnologico

- **React 19** + **Vite** (dev server, HMR, build)
- **react-router** – navigazione tra le pagine (SPA)
- **Redux Toolkit** + **react-redux** – store globale per i due timer
- **Axios** – chiamata all'API delle ricette
- **GSAP** (`gsap` + `@gsap/react`) – micro-animazioni (menu, "respiro" del contatore)
- **Sass** – SCSS Modules, variabili e reset condivisi
- **ESLint** – linting

---

## Avvio del progetto

```bash
# 1. installare le dipendenze
npm install

# 2. avviare il dev server (http://localhost:5173)
npm run dev

# 3. build di produzione in /dist
npm run build

# 4. anteprima della build
npm run preview

# 5. lint
npm run lint
```

Non servono variabili d'ambiente né chiavi API: l'endpoint delle ricette è pubblico.

---

## Struttura delle cartelle

```
src/
├── main.jsx                 # entry point: monta React, Redux Provider e Router
├── App.jsx                  # layout + definizione delle route
│
├── pages/                   # una cartella-vista per ogni route
│   ├── Home.jsx
│   ├── Meditazione.jsx
│   ├── Respiro.jsx
│   ├── Ricette.jsx
│   └── *.module.scss        # stile dedicato a ciascuna pagina
│
├── components/              # componenti riutilizzabili
│   ├── Header.jsx           # barra di navigazione + menu mobile
│   ├── Footer.jsx
│   ├── ButtonCTA.jsx        # bottone pieno
│   ├── ButtonOutline.jsx    # bottone outline
│   ├── CardsLink.jsx        # card informativa con link
│   ├── Timer.jsx            # timer countdown della meditazione
│   ├── TimerRespiro.jsx     # timer/animazione della respirazione
│   ├── RicetteAPI.jsx       # componente che fetcha e mostra la ricetta
│   └── *.module.scss
│
├── api/
│   └── ricette.js           # funzione Axios → TheMealDB
│
├── slice/                   # Redux Toolkit slices
│   ├── timerSlice.js
│   └── timerRespiroSlice.js
│
├── store/
│   └── store.js             # configureStore
│
├── style/
│   ├── main.scss            # entry globale (@use variables + reset)
│   ├── abstract/_variables.scss
│   └── base/_reset.scss
│
└── assets/                  # immagini, icone, favicon
```

---

## Architettura dell'app

### Entry point — `main.jsx`

L'app viene "avvolta" da tre provider, dall'esterno verso l'interno:

```jsx
<StrictMode>            // controlli extra di React in sviluppo
  <Provider store={store}>   // rende lo store Redux disponibile a tutti i componenti
    <BrowserRouter>          // abilita il routing con la History API
      <App />
    </BrowserRouter>
  </Provider>
</StrictMode>
```

Qui viene anche importato una volta sola `style/main.scss`, che carica variabili e reset globali.

### Layout — `App.jsx`

`App` è volutamente minimale: monta l'`Header` **una volta** (resta fisso a ogni
cambio pagina) e poi delega tutto a `<Routes>`. Ogni `<Route>` associa un path a una
pagina. È il pattern "layout + outlet" nella sua forma più semplice.

```jsx
<Header />
<Routes>
  <Route path="/"            element={<Home />} />
  <Route path="/meditazione" element={<Meditazione />} />
  <Route path="/respiro"     element={<Respiro />} />
  <Route path="/ricette"     element={<Ricette />} />
</Routes>
```

---

## Routing

Gestito da **react-router** (SPA, nessun reload di pagina).

- `App.jsx` definisce la mappa `path → componente`.
- `Header.jsx` usa `<NavLink>` per i link di navigazione: react-router aggiunge in
  automatico `aria-current="page"` al link attivo, sfruttato dal CSS per evidenziarlo.
- `Header.jsx` usa `useLocation()` per sapere quando cambia la rotta e **chiudere il
  menu mobile** dopo ogni navigazione.
- `Footer.jsx` e i bottoni usano `<Link>` (anche verso URL esterni).

---

## I componenti e la loro logica

### `Header.jsx` — navigazione + menu mobile

Concentra diversi hook, ognuno con un compito preciso:

- **`useState(isOpen)`** → apre/chiude il menu hamburger su mobile.
- **`useRef(menuRef)`** → riferimento al nodo `<nav>` da animare con GSAP.
- **`useEffect([isOpen])`** → anima l'apertura/chiusura. Usa `gsap.matchMedia()` per
  applicare l'animazione **solo sotto i 768px**; da desktop in su ripulisce gli stili
  inline così vince la media query del CSS. Il cleanup fa `mm.revert()`.
- **`useEffect([pathname])`** → chiude il menu ogni volta che cambia la pagina.
- **`<NavLink>`** → link con stato "attivo" accessibile.

È il componente che raccoglie più concetti "React puro": stato, effetti collaterali,
riferimenti al DOM, integrazione con una libreria esterna (GSAP) e reazione al router.

### `Footer.jsx` — componente di presentazione

Nessuno stato: riceve tutto "a codice". Viene importato e montato in fondo a ogni
pagina. Esempio del principio *"scrivi una volta, riusa ovunque"*.

### `ButtonCTA.jsx` / `ButtonOutline.jsx` — bottoni guidati dalle props

Due varianti visive dello stesso concetto. Ricevono `{ testo, path }` e restituiscono
un `<Link>` stilizzato. Condividono lo stesso file di stile (`buttonCta.module.scss`).
Mostrano come le **props rendano un componente configurabile** senza duplicare markup.

### `CardsLink.jsx` — card riutilizzabile e data-driven

Usata nella Home per presentare "Respira" e "Medita". Tutto il contenuto arriva dalle
props:

```jsx
<CardsLink
  urlSrc={icona}
  label="Respirazione guidata"
  title="Respira"
  testo="Bastano pochi minuti…"
  points={["Cicli 4-4-6…", "Animazione che detta il ritmo…", "…"]}
  ctaLabel="Inizia a respirare"
  path="/respiro"
/>
```

Punti didattici:

- **`points.map(...)`** con `key` per generare la lista in modo dichiarativo;
- `label` e `points` sono opzionali → **rendering condizionale** (`{label && …}`);
- l'intera card è cliccabile grazie a un pseudo-elemento `::after` sul link
  (pattern "stretched link"), pur mantenendo un solo elemento interattivo.

### `Timer.jsx` — countdown della meditazione (stato in Redux)

Il cuore della pagina Meditazione.

- **`useSelector`** legge `seconds` e `isRunning` dallo store (`state.timer`).
- **`useDispatch`** invia le azioni: `aggiungi_secondi`, `start`, `pausa`, `reset`.
- **`useEffect([isRunning])`** avvia un `setInterval` che ogni secondo fa
  `dispatch(tick())`; il cleanup (`clearInterval`) evita timer duplicati o "zombie"
  quando il componente si smonta o `isRunning` cambia.
- I secondi vengono convertiti in `mm:ss` con un semplice calcolo + `padStart`.
- **`useGSAP`** fa "respirare" il riquadro del contatore (scala 1 → 1.05 in loop)
  solo mentre il timer scorre, con ritorno morbido in pausa.

Perché lo stato è in Redux e non locale? Così la logica del tempo vive in un unico
posto (lo slice), è testabile in isolamento e sopravvive indipendentemente da come è
strutturata la UI.

### `TimerRespiro.jsx` — ritmo della respirazione

Versione più leggera del timer, sulla pagina Respiro.

- Legge/aggiorna `state.timerRespiro` via Redux (`avvia`, `pausa`, `reset`).
- **`useState(testoResp)`** — stato **locale** per la parola guida ("Respira"):
  è un dato puramente di presentazione, non serve condividerlo, quindi resta nel
  componente.
- L'animazione visiva (i tre cerchi con blur) è realizzata in CSS puro.

Mette a confronto **stato globale vs stato locale**: si sceglie caso per caso.

### `RicetteAPI.jsx`

Vedi la sezione dedicata più sotto.

---

## Gestione dello stato con Redux Toolkit

### `store/store.js`

```js
export const store = configureStore({
  reducer: {
    timer: timerSlice,          // stato della meditazione
    timerRespiro: timerRespiroSlice,  // stato della respirazione
  },
})
```

### `slice/timerSlice.js`

```js
initialState: { seconds: 0, isRunning: false }
```

| Azione | Effetto |
|---|---|
| `aggiungi_secondi(payload)` | somma i secondi scelti (bottoni 5/10/15/20/30 min) |
| `start()` | avvia il conteggio, ma solo se `seconds > 0` |
| `pausa()` | ferma il conteggio |
| `reset()` | riporta a `0` e ferma |
| `tick()` | decrementa di 1; a `0` si ferma da solo |

Grazie a **Immer** (incluso in Redux Toolkit) i reducer "mutano" lo state in modo
apparente (`state.seconds -= 1`) mentre sotto viene prodotto un nuovo stato immutabile.

### `slice/timerRespiroSlice.js`

Stessa struttura, più essenziale: `avvia`, `pausa`, `reset`.

---

## Stili: SCSS Modules e design tokens

- Ogni componente/pagina ha il suo `*.module.scss`: le classi vengono **rinominate in
  automatico** (`_card_61p6n_1`) → niente collisioni di nomi tra file.
- `style/abstract/_variables.scss` centralizza i **design tokens**: palette lilla,
  tipografia (`Inter` per il testo, `Nunito` per i titoli), ombre, border-radius,
  spaziature. Importati con `@use "..." as *`.
- `style/base/_reset.scss` è un reset moderno (ispirato ad Andy Bell / Josh Comeau):
  box-sizing, rimozione margini, immagini responsive, `prefers-reduced-motion`.
- Approccio **mobile-first**: stile base per smartphone, poi `@media (min-width: 768px)`
  per tablet/desktop (hero su due colonne, card affiancate, menu orizzontale).

> **Lezione imparata:** nei CSS Modules i selettori di *elemento* nudi (`img { … }`,
> `h2 { … }`) **non** vengono isolati e diventano regole globali. Nel progetto un
> `img { margin: 2rem auto }` in un modulo "sporcava" le immagini di altre pagine:
> la soluzione è scoppiare sempre su una classe (`.image { … }`).

---

## Pagina Ricette + Axios

La sezione "Ricette" mostra una **ricetta casuale** a ogni visita, presa da
[TheMealDB](https://www.themealdb.com/api.php), un'API gratuita di ricette.
Serve a esercitare il flusso completo *chiamata HTTP → stato → UI*.

### 1. Il livello dati — `src/api/ricette.js`

Tutta la comunicazione con l'esterno è isolata in una funzione, separata dalla UI:

```js
import axios from "axios";

const EP_RICETTE_RANDOM = "https://www.themealdb.com/api/json/v1/1/random.php";

async function richiestaRicetteAPI() {
  const risposta = await axios.get(EP_RICETTE_RANDOM);
  const ricetta = risposta.data.meals[0];   // l'API restituisce sempre 1 elemento

  return {
    nomeRicetta:  ricetta.strMeal,          // titolo
    linkRicetta:  ricetta.strYoutube,       // video su YouTube
    istruzRicetta: ricetta.strInstructions, // procedimento
    imgUrl:       ricetta.strMealThumb,     // foto del piatto
  };
}

export default richiestaRicetteAPI;
```

Punti chiave:

- **`axios.get`** restituisce una Promise; con `async/await` il codice resta lineare.
- La risposta grezza di TheMealDB ha decine di campi (`strIngredient1…20`, `strArea`,
  ecc.): la funzione fa da **adapter** e ne espone solo 4, con nomi comprensibili.
- L'endpoint usa la test key pubblica `1` → **nessuna configurazione né segreto**.
- Endpoint: `GET https://www.themealdb.com/api/json/v1/1/random.php`
  → `{ "meals": [ { ...unaRicetta } ] }`.

### 2. Il componente — `src/components/RicetteAPI.jsx`

```jsx
export default function RicetteAPI() {
  const [ricetta, setRicetta] = useState(null);   // null = non ancora arrivata

  useEffect(() => {
    async function fetchRicetta() {
      const risp = await richiestaRicetteAPI();
      setRicetta(risp);
    }
    fetchRicetta();
  }, []);   // [] → parte una sola volta, al montaggio del componente

  return (
    <div className={style.containerRicetta}>
      <p className={style.titleRicetta}>
        {ricetta ? ricetta.nomeRicetta : "Caricamento ricetta"}
      </p>

      {ricetta && (
        <img src={ricetta.imgUrl} alt={ricetta.nomeRicetta} className={style.imageRicetta} />
      )}

      {ricetta?.linkRicetta && (
        // link ESTERNO a YouTube → <a> normale (non <Link> di react-router,
        // che serve per le rotte interne)
        <a href={ricetta.linkRicetta} target="_blank" rel="noreferrer" className={style.btnVideo}>
          Guarda il video ▶
        </a>
      )}

      <p className={style.textRIcetta}>{ricetta ? ricetta.istruzRicetta : "-"}</p>
    </div>
  );
}

Il ciclo di vita, passo per passo:

1. **Primo render** → `ricetta` è `null` → la UI mostra i testi segnaposto
   ("Caricamento ricetta", "-").
2. **`useEffect` con `[]`** scatta subito dopo il montaggio e chiama l'API.
3. Quando la Promise si risolve, **`setRicetta(risp)`** aggiorna lo stato.
4. React **ri-renderizza**: adesso `ricetta` è un oggetto → compaiono titolo, foto,
   link al video e procedimento.

Concetti allenati: **`useState`**, **`useEffect` al mount**, **rendering condizionale**
(`ricetta ? … : …`), separazione tra *fetch dei dati* (in `api/`) e *presentazione*
(nel componente).

### 3. La pagina — `src/pages/Ricette.jsx`

Fa solo da contenitore: intestazione descrittiva + `<RicetteAPI />` + `<Footer />`.
La pagina non sa nulla di Axios: si limita a comporre i pezzi.

## Test

Test scritti con **[Vitest](https://vitest.dev/)** (il test runner nativo di Vite).

```bash
npm test          # esegue tutti i test una volta
npm run test:watch  # modalità watch durante lo sviluppo
```

La cartella `test/` contiene:

| File | Cosa verifica |
|---|---|
| `test/ricette.test.js` | la funzione Axios `richiestaRicetteAPI`: **axios è mockato** (`vi.mock`), quindi nessuna richiesta reale parte. Si controlla che venga chiamato l'endpoint corretto, che dalla risposta di TheMealDB vengano estratti solo i 4 campi utili e che un errore di rete venga propagato. |
| `test/timerSlice.test.js` | i reducer dello slice Redux `timerSlice`: sono funzioni pure, quindi si passano stato + azione e si controlla lo stato risultante (somma dei secondi, guardia di `start` a 0, `tick` che decrementa e si ferma a 0, `pausa`, `reset`). |

Configurazione: blocco `test` in `vite.config.js` (`environment: 'node'`, pattern
`test/**/*.{test,spec}.{js,jsx}`). Entrambi i test girano senza DOM perché provano
**logica pura**, non componenti.

## Possibili sviluppi futuri

- Persistenza del progresso (sessioni completate) in `localStorage`.
- Suono/campana a fine sessione di meditazione.
- Pagina "Percorso" con statistiche settimanali.

## Crediti

- **Progetto:** start2impact – modulo React, 2026.
- **Sviluppo & design:** Salvatore De Roma — [salvatorederoma.it](https://www.salvatorederoma.it)
- **API ricette:** [TheMealDB](https://www.themealdb.com/).
- **Illustrazioni:** asset in `src/assets`.
- **Font:** Inter e Nunito (Google Fonts).
