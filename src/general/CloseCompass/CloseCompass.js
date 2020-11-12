import React from "react"
import { ReactComponent as IconClose } from "../../headers/IndexMenuHeader/icons/icon-close.svg"
import { useHistory } from "react-router-dom"

const CloseCompass = (props) => {
  const history = useHistory()
  console.log("history : ", history)

  return (
    <div
      className="back-from-main-menu d-flex justify-content-center cursor-pointer"
      style={props.style}
      onClick={() => history.goBack()}
    >
      <IconClose />
    </div>
  )
}

export default CloseCompass
