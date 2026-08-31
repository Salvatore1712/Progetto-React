//Import delle pagine router
import { Route, Routes } from "react-router"
import Home from "./pages/Home"
import Meditazione from "./pages/Meditazione"
import Respiro from "./pages/Respiro"
import Header from "./components/Header"
import Ricette from "./pages/Ricette"


function App() {

  return (
    <>
    <Header></Header>
      <Routes>
        <Route path="/" element={<Home></Home>} />
        <Route path="/meditazione" element={<Meditazione></Meditazione>} />
        <Route path="/respiro" element={<Respiro></Respiro>} />
        <Route path="/ricette" element={<Ricette></Ricette>} />
      </Routes>
    </>
  )
}

export default App
