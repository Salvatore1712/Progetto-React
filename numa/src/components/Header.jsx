import style from "./header.module.scss"
import { NavLink, useLocation } from "react-router"
import gsap from "gsap"
import logoNuma from "../assets/logo-numa-meditazione-oriz 1.png" //import logo
import { useEffect, useRef, useState } from "react"


//componente Header riutilizzabile in tutte le pagine
export default function Header () {
    const [isOpen, setIsOpen] = useState(false) //menu hamburger sato
    const menuRef = useRef(null)
    const {pathname} = useLocation()
    
    // gsetione apertura menu animaz
    useEffect(()=> {
        const mm = gsap.matchMedia()

        mm.add("(max-width: 767px)", () => {
            gsap.to(menuRef.current, {
                autoAlpha: isOpen ? 1 : 0,
                duration: 0.5,
            })
        })

        mm.add("(min-width: 768px)", () => {
            gsap.set(menuRef.current, { clearProps: "opacity,visibility" })
        })

        return () => mm.revert()
    }, [isOpen])

    // toggle apre chiudi menu
    useEffect(()=> {
        setIsOpen(false)
    }, [pathname])

    return(
        <header className={style.header}>
            <img src={logoNuma} alt="logo numa meditazione" className={style.header__image}/>
            <span className={`${style.header__menuIcon} ${isOpen ? style["header__menuIcon--open"] : ""}`} onClick={() => setIsOpen(prev => !prev)} />
            <nav className={style.header__menu} ref={menuRef}>
                <ul>
                    <li><NavLink to="/" end>Home</NavLink></li>
                    <li><NavLink to="/meditazione">Meditazione</NavLink></li>
                    <li><NavLink to="/respiro">Respiro</NavLink></li>
                    <li><NavLink to="/ricette">Ricette</NavLink></li>
                </ul>
            </nav>
        </header>
    )
}