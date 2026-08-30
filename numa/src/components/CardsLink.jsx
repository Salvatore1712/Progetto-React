import { Link } from "react-router"
import style from "./_cardsLink.module.scss"
export default function CardsLink({title, testo, path}) {
    return (
        <div className={style.card}>
            <h3 className={style.card__title}>{title}</h3>
            <p className={style.card__text}>{testo}</p>
            <Link to={path}>➜</Link>
        </div>
    )
}