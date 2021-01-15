import React from "react"
import { withTranslation, Trans } from "react-i18next";

import "./RadioButton.css"

function RadioButton({
  buttonUpClass,
  buttonDownClass,
  callStateContainerRadioButtonPressed,
  id,
  caption,
  pressed,
  buttonColor,
  t
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
      {t(caption)}
    </div>
  )
}

export default withTranslation("translation")(RadioButton)
