import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import MainMenu from '../../general/MainMenu/MainMenu'
import { ReactComponent as IconClose } from './icons/icon-close.svg'

export default function IndexMenuHeader({
  // 'openIndex' | 'closeIndex' | 'homeLink'
  menuAction = 'openIndex',
  onClose,
}) {
  return (
    <div className="top-nav navigations">
      {menuAction === 'openIndex' && <MainMenu />}
      {menuAction === 'closeIndex' && (
        <div
          className="d-flex justify-content-center cursor-pointer"
          style={{ gridColumn: 'span 1' }}
          onClick={() => onClose()}
        >
          <IconClose />
        </div>
      )}
      {menuAction === 'homeLink' && (
        <Link
          to="/"
          className="d-flex justify-content-center cursor-pointer align-items-center"
          style={{ gridColumn: 'span 1' }}
        >
          <IconClose />
        </Link>
      )}
      <div
        style={{ gridColumn: 'span 22' }}
        className="d-flex justify-content-center"
      >
        <NavLink to="/" className="ml-5 mr-5">
          Atlante Calvino
        </NavLink>
        <NavLink to="/About" className="ml-5 mr-5">
          Équipe
        </NavLink>
        <NavLink to="/Project" className="ml-5 mr-5">
          Progetto
        </NavLink>
        <NavLink to="/Tools" className="ml-5 mr-5">
          Istruzioni per l'uso
        </NavLink>
        <NavLink to="/Capta" className="ml-5 mr-5">
          Capta
        </NavLink>
        <NavLink to="/Papers" className="ml-5 mr-5">
          Pubblicazioni
        </NavLink>
      </div>
      <div
        style={{ gridColumn: 'span 1' }}
        className="d-flex align-items-center justify-content-center"
      >
        <Link className="text-dark-blue" to="/">
          IT
        </Link>
      </div>
    </div>
  )
}
