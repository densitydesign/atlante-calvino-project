
import React from 'react';
//import Options from '../../general/Options/Options';
import AltOptions from '../../general/Options/Options';
import ToggleButton from '../../general/ToggleButton/ToggleButton';
import GlobalData from '../../utilities/GlobalData';

import '../../App.css';

const territoryLabel = "territorio";
const     doubtLabel = "nebbia";
const     shapeLabel = "elenchi";
const     spaceLabel = "luoghi";

const itineraryOptions = [
  { label : territoryLabel },
  { label :     doubtLabel },
  { label :     spaceLabel },
  { label :     shapeLabel }
];

export default class TerritoryFooter extends React.Component
{

  itineraryLabelOptionPanelModeMap = new Map([
    [ territoryLabel, { bottomPanelMode : GlobalData.bottomPanelModes.noAnalysis, mainAnalysisMode : GlobalData.analysisModes.noAnalysis } ],
    [ doubtLabel,     { bottomPanelMode : GlobalData.bottomPanelModes.doubt,      mainAnalysisMode : GlobalData.analysisModes.doubt } ],
    [ shapeLabel,     { bottomPanelMode : GlobalData.bottomPanelModes.shape,      mainAnalysisMode : GlobalData.analysisModes.shape } ],
    [ spaceLabel,     { bottomPanelMode : GlobalData.bottomPanelModes.space,      mainAnalysisMode : GlobalData.analysisModes.space } ]
  ]);

  optionPanelModeItineraryMap = new Map([
    [ GlobalData.bottomPanelModes.doubt, doubtLabel ],
    [ GlobalData.bottomPanelModes.space, spaceLabel ],
    [ GlobalData.bottomPanelModes.shape, shapeLabel ]
  ]);

  analysisModeToggleButtonId = "analysisModeToggleButton";
  analysisModeToggleButtonCaption = "FILTRO CRONOLOGICO";

  chronologicalFilterToggleButtonId = "chronologicalFilterToggleButton";
  chronologicalFilterToggleButtonCaption = "FILTRO CRONOLOGICO";

  legendToggleButtonId = "legendToggleButton";
  legendToggleButtonCaption = "LEGENDA";

  toggleButtonsMap = new Map([
    [ this.legendToggleButtonId,              { bottomPanelMode     : GlobalData.bottomPanelModes.legend } ],
    [ this.chronologicalFilterToggleButtonId, { bottomPanelMode     : GlobalData.bottomPanelModes.chronologicalFilter } ]
  ]);
/*
  state = {
    itineraries : {
      multiple : false,
      options : [
        { label : this.territoryLabel, status : true },
        { label : this.doubtLabel,     status : false },
        { label : this.spaceLabel,     status : false },
        { label : this.shapeLabel,     status : false }        
      ]
    }
  };
*/

  state = {
    itinerary : null//itineraryOptions.map(d => d.label)
  };

// set here bottom panel mode, rather than higlight mode
  changeItineraries = newOptions => {
    const visualizationMode = this.itineraryLabelOptionPanelModeMap.get(this.getActiveOption(newOptions));

    this.props.setBottomPanelMode(visualizationMode.bottomPanelMode);
    this.props.setMainAnalysisMode(visualizationMode.mainAnalysisMode);
  }

  getActiveOption = options => options.find(item => item.status === true).label;

  toggleButtonPressed = buttonId => {    

    switch(buttonId)
    {
      case this.analysisModeToggleButtonId :

        this.props.toggleBottomPanelPosition();

        break;

      case this.chronologicalFilterToggleButtonId :
      case this.legendToggleButtonId :

        const value = this.toggleButtonsMap.get(buttonId);

        if(value.bottomPanelMode !== this.props.bottomPanelMode)
          this.props.setBottomPanelMode(value.bottomPanelMode);
        else
          this.props.setBottomPanelMode(GlobalData.bottomPanelModes.noAnalysis); 

        break;

      default : throw new Error("buttonId not recognized : " + buttonId);
    }
  };

  render()
  {
    const { itinerary } = this.state;

/*
          <Options
            title="Sfere"
            data={this.state.itineraries}
            style={{ gridColumn : "span 8", textAlign : "center" }}
            changeOptions={this.changeItineraries}
          />

          <AltOptions
            title="Itinerari"
            options={itinerary}
            style={{ gridColumn: "span 8", textAlign: "center" }}
            value={itinerary}
            onChange={
//              itinerary => this.setState({ itinerary : itinerary.map(x => x.label) })

              itinerary => {
                const visualizationMode = this.itineraryLabelOptionPanelModeMap.get(itinerary);

                this.props.setBottomPanelMode(visualizationMode.bottomPanelMode);
                this.props.setMainAnalysisMode(visualizationMode.mainAnalysisMode);
              }

            }
          />
*/

console.log("itinerary", itinerary);

    return (
      <div className="bottom-nav navigations">

        {
          ![
            GlobalData.bottomPanelModes.doubt, 
            GlobalData.bottomPanelModes.space,
            GlobalData.bottomPanelModes.shape
          ].includes(this.props.bottomPanelMode) &&
          <AltOptions
            title="Itinerari"
            options={itinerary}
            style={{ gridColumn: "span 8", textAlign: "center" }}
            value={itinerary}
            onChange={
//              itinerary => this.setState({ itinerary : itinerary.map(x => x.label) })

              itinerary => {
                const visualizationMode = this.itineraryLabelOptionPanelModeMap.get(itinerary);

                this.props.setBottomPanelMode(visualizationMode.bottomPanelMode);
                this.props.setMainAnalysisMode(visualizationMode.mainAnalysisMode);
              }

            }
          />
          
        }

        {
          [
            GlobalData.bottomPanelModes.doubt, 
            GlobalData.bottomPanelModes.space,
            GlobalData.bottomPanelModes.shape
          ].includes(this.props.bottomPanelMode) &&

          <ToggleButton 
            id={this.analysisModeToggleButtonId} 
            style={{ gridColumn : "span 8" }}
            caption={this.optionPanelModeItineraryMap.get(this.props.bottomPanelMode)}
            pressed={
              false
//              this.props.bottomPanelMode === this.toggleButtonsMap.get(this.chronologicalFilterToggleButtonId).bottomPanelMode ||
//              !matchPair(this.props.dataExtent, GlobalData.defaultTerritoryDataExtent)
            }
            callStateContainerToggleButtonPressed={this.toggleButtonPressed} 
          />
        }

        <ToggleButton
          id={this.chronologicalFilterToggleButtonId}
          style={{ gridColumn : "span 8" }}
          caption={this.chronologicalFilterToggleButtonCaption}
          pressed={
            this.props.bottomPanelMode === this.toggleButtonsMap.get(this.chronologicalFilterToggleButtonId).bottomPanelMode ||
            !matchPair(this.props.dataExtent, GlobalData.defaultTerritoryDataExtent)
          }
          callStateContainerToggleButtonPressed={this.toggleButtonPressed}
        />

        <ToggleButton
          id={this.legendToggleButtonId}
          style={{ gridColumn : "span 8" }}
          caption={this.legendToggleButtonCaption}
          pressed={this.props.bottomPanelMode === this.toggleButtonsMap.get(this.legendToggleButtonId).bottomPanelMode}
          callStateContainerToggleButtonPressed={this.toggleButtonPressed}
        />

      </div>
    );
  }
}

function matchPair(p1, p2)
{
  return p1[0] <= p2[0] && p1[1] >= p2[1];
}
