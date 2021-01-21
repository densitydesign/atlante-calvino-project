import React from "react"
import LanguageSwitch from "../../general/LanguageSwitch"
import MainMenu from "../../general/MainMenu/MainMenu"
import { ReactComponent as CloseIcon } from "../IndexMenuHeader/icons/icon-close.svg"
import { createBrowserHistory } from "history"


export default function HamburgerCompassHeader({
  toggleFlowOfStories,
  toggleTempoEOpere,
  isSubPageBussola,
}) {
  const toggleFlows = toggleFlowOfStories || toggleTempoEOpere
  const history = createBrowserHistory()

  return isSubPageBussola ? (
    <div className="top-nav navigations">
      <div
        onClick={toggleFlows}
        className="cursor-pointer d-flex justify-content-center"
        style={{ gridColumn: "span 1" }}
      >
        {toggleFlows ? <CloseIcon onClick={toggleFlows} /> : <CloseIcon onClick={() => history.goBack()} />}
      </div>
      <div style={{ gridColumn: "span 22" }} />
      <div className='cursor-pointer d-flex justify-content-center' style={{ gridColumn: "span 1" }}>
        <LanguageSwitch />
      </div>
    </div>
  ) : (
    <div className="top-nav navigations">
      <MainMenu style={{ gridColumn: "span 1" }} />
      <div style={{ gridColumn: "span 22" }} />
      <div
        onClick={toggleFlows}
        className="cursor-pointer d-flex justify-content-center"
        style={{ gridColumn: "span 1" }}
      >
        {toggleFlows ? <CloseIcon onClick={toggleFlows} /> : <LanguageSwitch />}
      </div>
    </div>
  )
}
