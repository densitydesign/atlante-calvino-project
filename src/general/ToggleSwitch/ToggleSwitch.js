import React, { Component } from 'react';
import './ToggleSwitch.css'

class ToggleSwitch extends Component {
  _setRef(componentNode) {
    this._rootNode = componentNode;
  }
  componentDidMount() {
    this._rootNode.style.setProperty("--switch-width", this.props.width+"px");
    this._rootNode.style.setProperty("--switch-height", this.props.height+"px");
    this._rootNode.style.setProperty("--switch-circle-padding", this.props.circlePadding+"px");
    this._rootNode.style.setProperty("--border", this.props.border);
    this._rootNode.style.setProperty("--border-active", this.props.border_active);
    this._rootNode.style.setProperty("--background", this.props.background);
    this._rootNode.style.setProperty("--background-active", this.props.background_active);
    this._rootNode.style.setProperty("--circle", this.props.circle);
    this._rootNode.style.setProperty("--circle-active", this.props.circle_active);
  }
  render() {
    const span_style = {
      borderRadius:this.props.rounded?Math.min(this.props.width,this.props.height):0
    }
    return <div className="toggle-switch" ref={this._setRef.bind(this)} style={{left:this.props.leftPositioning}}>
      <label className="switch" style={{marginRight:this.props.marginRight}}>
        <input type="checkbox" onChange={this.props.onChange}/>
        <span className={this.props.rounded?"slider round":"slider"} style={span_style}/>
      </label>
      {this.props.label}
    </div>;
  }
}

export default ToggleSwitch;

ToggleSwitch.defaultProps = {
  label:"Slider action",
  width:28,
  height:14,
  circlePadding:1,
  marginRight:8,
  leftPositioning:-13,
  rounded:true,
  border:'#333333',
  border_active:'#333333',
  background:'#cccccc',
  background_active:'#2196F3',
  circle:'#fafafa',
  circle_active:'#ffffff',
  onChange: ()=>console.log('Slider toggled')
}