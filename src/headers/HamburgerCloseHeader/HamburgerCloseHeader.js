import React from "react"
import CloseCompass from "../../general/CloseCompass/CloseCompass"
import CloseCompassPanel from "../../general/CloseCompass/CloseCompassPanel"
import MainMenu from "../../general/MainMenu/MainMenu"

import "../../App.css"

export default class HamburgerCloseHeader extends React.Component {
  render() {
    return (
      <div className="top-nav navigations">
        <MainMenu style={{ gridColumn: "span 1" }} />
        <div style={{ gridColumn: "span 22" }} />
        <div style={{ gridColumn: "span 1" }} />
      </div>
    )
  }
}
