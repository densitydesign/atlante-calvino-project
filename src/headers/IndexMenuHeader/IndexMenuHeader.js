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
        <NavLink to="/" className="ml-5 mr-5 top-menu">
          Atlante Calvino
        </NavLink>
        <NavLink to="/equipe" className="ml-5 mr-5 top-menu">
          Équipe
        </NavLink>
        <NavLink to="/project" className="ml-5 mr-5 top-menu">
          Progetto
        </NavLink>
        <NavLink to="/instructions" className="ml-5 mr-5 top-menu">
          Istruzioni per l'uso
        </NavLink>
        <NavLink to="/capta" className="ml-5 mr-5 top-menu">
          Capta
        </NavLink>
        <NavLink to="/publications" className="ml-5 mr-5 top-menu">
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
