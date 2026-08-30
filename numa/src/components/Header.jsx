import style from "./_header.module.scss"
import { Link, useLocation } from "react-router"
import gsap from "gsap"

//import logo
import logoNuma from "../assets/logo-numa-meditazione-oriz 1.png"
import { useEffect, useRef, useState } from "react"

//componente Header riutilizzabile in tutte le pagine
export default function Header () {
    const [isOpen, setIsOpen] = useState(false) //menu hamburger sato
    const menuRef = useRef(null)
    const {pathname} = useLocation()

    useEffect(()=> {
        gsap.to(menuRef.current, {
            autoAlpha: isOpen ? 1 : 0,
            duration: 0.5,
        })
    }, [isOpen])

    useEffect(()=> {
        setIsOpen(false)
    }, [pathname])

    return(
        <header className={style.header}>
            <img src={logoNuma} alt="logo numa meditazione" className={style.header__image}/>
            <span className={`${style.header__menuIcon} ${isOpen ? style["header__menuIcon--open"] : ""}`} onClick={() => setIsOpen(prev => !prev)} />
            <nav className={style.header__menu} ref={menuRef}>
                <ul>
                    <li><Link to="/">➜ Home</Link></li>
                    <li><Link to="/meditazione">➜ Meditazione</Link></li>
                    <li><Link to="/respiro">➜ Respiro</Link></li>
                </ul>
            </nav>
        </header>
    )
}