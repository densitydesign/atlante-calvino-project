import React from 'react'
import {scaleLinear}  from 'd3'

const MIN_VIZ_HEIGHT = 400;


class MarimekkoViz extends React.Component {

  state = {
    height: 0,
    width: 0,
    widthScale: null,
    heightScale: null,
  }

  vizContainerRef = React.createRef();

  componentDidMount(){
    const rect = this.vizContainerRef.current.getBoundingClientRect()
    const widthScale = scaleLinear().domain([0, 100]).range(0, rect.height)
    const heightScale = scaleLinear().domain([0, 100]).range(0, rect.height)

    this.setState({
      width: rect.width,
      height: rect.height,
      widthScale,
      heightScale,
    })
    
  }

  render(){

    const { width, height } = this.state
    const { booksData } = this.props
    
    return <div className="container-fluid h-100 bg-light d-flex flex-column">
      <div className="row no-gutters  bg-danger" style={{flex: 2, minHeight: 100}}>
        <div className="col-sm-1">

        </div>
        <div className="col-sm-9">
          
        </div>

      </div>
      <div className="row no-gutters w-100" style={{minHeight: MIN_VIZ_HEIGHT, flex: 8}}>
        <div className="col-sm-1">

        </div>
        <div className="col-sm-9 border" ref={this.vizContainerRef}>
          {width > 0 && height > 0 && <svg className="h-100 w-100 bg-primary">
          
          
          </svg>}
        </div>
        <div className="col-sm-2">
          legend here

        </div>
      </div>

      <div className="row no-gutters bg-warning" style={{flex: 1, minHeight: 50}}>

      </div>

    </div>
  }
}


export default MarimekkoViz

