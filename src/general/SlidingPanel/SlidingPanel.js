
import React from 'react';

import './SlidingPanel.css';

export default class SlidingPanel extends React.Component
{
  constructor(props)
  {
    super(props);

    this.state = { open : JSON.parse(props.open) };
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount()
  {
    document.addEventListener("mousedown", this.handleClick);
  }

  componentWillUnmount()
  {
    document.removeEventListener("mousedown", this.handleClick);
  }

  setWrapperRef(node)
  {
    this.wrapperRef = node;
  }

  handleClick(event)
  {
    if(!this.wrapperRef) return;

    this.setState({ open : this.wrapperRef.contains(event.target) });

console.log("panel id : ", this.props.id);

//    this.setState({ open : this.wrapperRef.contains(event.target) || this.props.getSelectedPanel() > Number.parseInt(this.props.id)});
  }

  render()
  {
    return (
      <div 
        className={"sliding-panel " + (this.state.open ? "sliding-panel-open" : "sliding-panel-closed")} 
        ref={this.setWrapperRef} 
        style={{ 
          background : this.props.background,
          right : Number.parseInt(this.props.right) + (this.state.open ? 400 : 0),
          zIndex : this.props.zIndex
        }}>

        <h3>{this.props.title}</h3>
        <p>{this.props.text}</p>

      </div>
    );
  }
}
