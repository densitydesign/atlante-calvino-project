import ReactDOM from 'react-dom'
import React, { Component, useRef } from 'react'
import { ReactComponent as IconIndexMenu } from '../../headers/IndexMenuHeader/icons/icon-index.svg'
import IndexMenu from '../../views/IndexMenu/IndexMenu'
import './MainMenu.css'

function ModalIndexMenu({ toggle }) {
  const modalNode = useRef()
  if (!modalNode.current) {
    modalNode.current = document.getElementById('index-menu-modal-container')
  }

  if (modalNode.current) {
    return ReactDOM.createPortal(
      <div className="index-menu-open-fixed">
        <IndexMenu onClose={toggle} />
      </div>,
      modalNode.current
    )
  }

  return null
}

class MainMenu extends Component {
  state = {
    open: false,
  }

  toggle = () => {
    this.setState((s) => ({
      open: !s.open,
    }))
  }

  render() {
    return (
      <div className="main-menu" style={this.props.style}>
        <span className="main-menu-inner" onClick={this.toggle}>
          <IconIndexMenu />
        </span>
        {this.state.open && (
          <ModalIndexMenu toggle={this.toggle} />
        )}
      </div>
    )
  }
}

export default MainMenu

MainMenu.defaultProps = { style: { gridColumn: 'span 1' } }
