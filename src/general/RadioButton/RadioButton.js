import React from "react"
import { useHistory } from "react-router-dom"

import "./RadioButton.css"

export default function RadioButton({
  buttonUpClass,
  buttonDownClass,
  callStateContainerRadioButtonPressed,
  id,
  caption,
  pressed,
  buttonColor,
  linkRefresh,
}) {
  const buttonUpClassname = buttonUpClass || "radio-button-up"
  const buttonDownClassname = buttonDownClass || "radio-button-down"
  let history = useHistory()

  return (
    <div
      id={id}
      style={
        pressed
          ? { backgroundColor: buttonColor }
          : { borderColor: buttonColor }
      }
      className={pressed ? buttonDownClassname : buttonUpClassname}
      onClick={() => {
        callStateContainerRadioButtonPressed(id)
        setTimeout(() => {
          linkRefresh && history.push(linkRefresh)
        },3000)
      }}
    >
      {caption}
    </div>
  )
}
