import React, { Component } from 'react';
import './PlacesMatrix.css'
import V from './matrix.d3'

class PlacesMatrix extends Component {

  componentDidMount() {
    // console.log('componentDidMount')
    V.initialize(this._rootNode, this.props.data, this.props.originalData, this.props.onChangeCategorie, this.props.resetFilter)
    V.update(this.props.timeFilter);
    V.filter(this.props.filter)
  }

  componentDidUpdate(prevProps, prevState) {
    // console.log('componentDidUpdate')

    if (this.props.filter !== prevProps.filter) {
      // console.log('new filters')
      if (this.props.searched.length !== this.props.originalData.length) {
        V.openOnSearch(this.props.searched)
      }
      const selectThoseLabels = this.props.searched;
      V.filter(this.props.filter, selectThoseLabels)
    }

    if (this.props.timeFilter !== prevProps.timeFilter) {
      V.update(this.props.timeFilter)
    }

    if (this.props.gruppi !== prevProps.gruppi) {
      console.log(this.props.gruppi)
      if (this.props.gruppi === 'aperti') {
        V.openAll();
      } else if (this.props.gruppi === 'chiusi') {
        V.closeAll();
      }
      V.update();
    }
  }

  componentWillUnmount() {
    // console.log('componentWillUnmount')
    V.destroy(this._rootNode);
  }

  _setRef(componentNode) {
      this._rootNode = componentNode;
  }

  render() {
    const style={
      width: '100%',
      height: '100%'
    }
    return <svg id={this.props.id} style={style} ref={this._setRef.bind(this)}></svg>
  }
}

export default PlacesMatrix;
