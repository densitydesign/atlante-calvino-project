
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

    if(this.wrapperRef.contains(event.target)) this.setState({ open : true });
    else this.setState({ open : false });
  }

  render()
  {
    return (
      <div className={"sliding-panel " + (this.state.open ? "sliding-panel-open" : "sliding-panel-closed")} ref={this.setWrapperRef} style={{ float: "left", background : this.props.background }}>
        {this.props.children}
      </div>
    );
  }
}
