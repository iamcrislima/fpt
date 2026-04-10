import { NavLink, useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faTrophy,
  faRankingStar,
  faHouse,
  faUserPlus,
  faBars,
} from '@fortawesome/free-solid-svg-icons'
import './BottomNavBar.css'

/*
 * Layout: [ Torneios ] [ Ranking ] [ INÍCIO ★ ] [ Faça Parte ] [ Mais ]
 * Item central é o Início — circular, maior, cor primária.
 */
const LEFT_ITEMS = [
  { path: 'torneios',  label: 'Torneios', icon: faTrophy      },
  { path: 'ranking',   label: 'Ranking',  icon: faRankingStar },
]

const RIGHT_ITEMS = [
  { path: 'faca-parte', label: 'Faça Parte', icon: faUserPlus },
]

export default function BottomNavBar({ onOpenMenu }) {
  const { sport } = useParams()

  function sportLink(path) {
    return path ? `/${sport}/${path}` : `/${sport}`
  }

  return (
    <nav className="bottom-nav" aria-label="Navegação principal">

      {/* Esquerda */}
      {LEFT_ITEMS.map(({ path, label, icon }) => (
        <NavLink
          key={path}
          to={sportLink(path)}
          className={({ isActive }) =>
            `bottom-nav__item${isActive ? ' bottom-nav__item--active' : ''}`
          }
        >
          <FontAwesomeIcon icon={icon} className="bottom-nav__icon" aria-hidden="true" />
          <span className="bottom-nav__label">{label}</span>
        </NavLink>
      ))}

      {/* Centro — Home em destaque */}
      <NavLink
        to={sportLink('')}
        end
        className={({ isActive }) =>
          `bottom-nav__item bottom-nav__item--center${isActive ? ' bottom-nav__item--active' : ''}`
        }
        aria-label="Início"
      >
        <span className="bottom-nav__center-bubble">
          <FontAwesomeIcon icon={faHouse} className="bottom-nav__icon--center" aria-hidden="true" />
        </span>
        <span className="bottom-nav__label">Início</span>
      </NavLink>

      {/* Direita */}
      {RIGHT_ITEMS.map(({ path, label, icon }) => (
        <NavLink
          key={path}
          to={sportLink(path)}
          className={({ isActive }) =>
            `bottom-nav__item${isActive ? ' bottom-nav__item--active' : ''}`
          }
        >
          <FontAwesomeIcon icon={icon} className="bottom-nav__icon" aria-hidden="true" />
          <span className="bottom-nav__label">{label}</span>
        </NavLink>
      ))}

      {/* Mais — abre drawer */}
      <button
        className="bottom-nav__item"
        onClick={onOpenMenu}
        aria-label="Abrir menu"
      >
        <FontAwesomeIcon icon={faBars} className="bottom-nav__icon" aria-hidden="true" />
        <span className="bottom-nav__label">Mais</span>
      </button>

    </nav>
  )
}
