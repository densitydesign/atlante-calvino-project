import React from "react"
import { Link, NavLink } from 'react-router-dom'
import { ReactComponent as IconHomeIndex } from './icons/icon-index.svg'
import './IndexMenuHeader.css'

export default function IndexMenuHeader() {
  return (
    <div className="top-nav navigations">
      <div className='d-flex justify-content-center' style={{ gridColumn: "span 1" }}>
        <Link to='/HomeIndex'>
            <IconHomeIndex />
        </Link>
      </div>
      <div
        style={{ gridColumn: "span 21", marginLeft: 168, marginRight: 168 }}
        className="d-flex justify-content-between"
      >
        <NavLink to='/'>Atlante Calvino</NavLink>
        <NavLink to='/About'>Équipe</NavLink>
        <NavLink to='/Project'>Progetto</NavLink>
        <NavLink to='/Tools'>Istruzioni per l'uso</NavLink>
        <NavLink to='/Capta'>Capta</NavLink>
        <NavLink to='/Papers'>Pubblicazioni</NavLink>
      </div>
    </div>
  )
}
