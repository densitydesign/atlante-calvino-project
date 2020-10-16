import React from "react"
import { useHistory } from "react-router-dom"
import { Link, NavLink } from "react-router-dom"
import { ReactComponent as IconClose } from "./icons/icon-close.svg"
import { ReactComponent as IconIndex } from "./icons/icon-index.svg"
import "./IndexMenuHeader.css"

export default function IndexMenuHeader() {
  const history = useHistory()

  console.log(history.location.pathname)

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
        style={{ gridColumn: "span 21", marginLeft: 168, marginRight: 168 }}
        className="d-flex justify-content-between"
      >
        <NavLink to="/">Atlante Calvino</NavLink>
        <NavLink to="/About">Équipe</NavLink>
        <NavLink to="/Project">Progetto</NavLink>
        <NavLink to="/Tools">Istruzioni per l'uso</NavLink>
        <NavLink to="/Capta">Capta</NavLink>
        <NavLink to="/Papers">Pubblicazioni</NavLink>
      </div>
    </div>
  )
}
