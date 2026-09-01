import { Link } from "react-router"
import style from "./cardsLink.module.scss"

// *** COMPONENTE CARDS HOME PAGE
// attributi per immagini e testo passati come props 
export default function CardsLink({ urlSrc, label, title, testo, points = [], ctaLabel, path }) {
    return (
        <article className={style.card}>
            <div className={style.card__head}>
                <img src={urlSrc} alt="" className={style.card__icon} />
                {label && <span className={style.card__label}>{label}</span>}
            </div>

            <h3 className={style.card__title}>{title}</h3>
            <p className={style.card__text}>{testo}</p>

            {points.length > 0 && (
                <ul className={style.card__points}>
                    {points.map((p) => (
                        <li key={p}>{p}</li>
                    ))}
                </ul>
            )}

            <Link to={path} className={style.card__cta} aria-label={ctaLabel || title}>
                <span>{ctaLabel || "Scopri"}</span>
                <span aria-hidden="true">➜</span>
            </Link>
        </article>
    )
}
