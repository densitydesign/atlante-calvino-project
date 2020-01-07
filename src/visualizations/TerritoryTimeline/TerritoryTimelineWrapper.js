
import React from 'react';

import TerritoryTimeline from './TerritoryTimeline';

export default class TerritoryTimelineWrapper extends React.Component
{
  render()
  {
    return <TerritoryTimeline data={this.props.data} />
  }
}