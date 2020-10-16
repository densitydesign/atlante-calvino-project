import React from "react"
import { useHistory } from "react-router-dom"
import { Link, NavLink } from "react-router-dom"
import { ReactComponent as IconClose } from "./icons/icon-close.svg"
import { ReactComponent as IconIndex } from "./icons/icon-index.svg"

export default function IndexMenuHeader() {
  const history = useHistory()

  return (
    <div className="top-nav navigations">
      {history.location.pathname !== "/About" &&
      history.location.pathname !== "/Project" &&
      history.location.pathname !== "/Tools" &&
      history.location.pathname !== "/Capta" &&
      history.location.pathname !== "/Papers" ? (
        <div
          className="d-flex justify-content-center cursor-pointer"
          style={{ gridColumn: "span 1" }}
          onClick={() => history.goBack()}
        >
          <IconClose />
        </div>
      ) : (
        <div
          className="d-flex justify-content-center cursor-pointer"
          style={{ gridColumn: "span 1" }}
        >
          <Link to="/HomeIndex">
            <IconIndex />
          </Link>
        </div>
      )}
      <div
        style={{ gridColumn: "span 22" }}
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
        style={{ gridColumn: "span 1" }}
        className="d-flex align-items-center justify-content-center"
      >
        <Link className='text-dark-blue' to='/'>IT</Link>
      </div>
    </div>
  )
}
