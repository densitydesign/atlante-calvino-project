import React from "react"

import "./RadioButton.css"

export default function RadioButton({
  buttonUpClass,
  buttonDownClass,
  callStateContainerRadioButtonPressed,
  id,
  caption,
  pressed,
  buttonColor,
}) {
  const buttonUpClassname = buttonUpClass || "radio-button-up"
  const buttonDownClassname = buttonDownClass || "radio-button-down"

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
      }}
    >
      {caption}
    </div>
  )
}
