
import React from 'react';
import * as d3 from 'd3';

import Territory from './Territory';
import TerritoryHeader from '../../headers/TerritoryHeader/TerritoryHeader';
import TerritoryNoAnalysisDropDown from '../../general/TerritoryNoAnalysisDropDown/TerritoryNoAnalysisDropDown';
import TerritoryBottomPanel from '../../panels/TerritoryBottomPanel/TerritoryBottomPanel';
import HelpSidePanel from '../../panels/HelpSidePanel/HelpSidePanel';
import TerritoryItinerariesDropUp from '../../general/TerritoryItinerariesDropUp/TerritoryItinerariesDropUp';
import TerritoryFooter from '../../footers/TerritoryFooter/TerritoryFooter';
import GlobalData from '../../utilities/GlobalData';
import CompassPanel from '../../panels/CompassPanel/CompassPanel';

import { draw_jellyfish, prepare_jellyfish_data, visit } from './jellyfish';

import './TerritoryWrapper.css';

export default class TerritoryWrapper extends React.Component
{
  state = {
    data : "data still not loaded",
    isLoading : true,    

    noAnalysisDropDownPosition : GlobalData.noAnalysisDropDownPositions.closed,
    itineraryDropUpPosition    : GlobalData.itineraryDropUpPositions.closed,
    bottomPanelMode            : this.props.bottomPanelMode,
    bottomPanelPosition        : GlobalData.bottomPanelPositions.open,
    doubtPanelMode             : GlobalData.analysisPanelModes.doubt.fog,
    spacePanelMode             : GlobalData.analysisPanelModes.space.genericTerrestrial,    
    shapePanelMode             : GlobalData.analysisPanelModes.shape.types,

    mainAnalysisMode  : this.props.mainAnalysisMode,
    noAnalysisMode    : GlobalData.analysisModes.noAnalysis.chronology,
    doubtAnalysisMode : GlobalData.analysisModes.doubt.fog,
    spaceAnalysisMode : GlobalData.analysisModes.space.genericTerrestrial,
    shapeAnalysisMode : GlobalData.analysisModes.shape.types,    

    compassPanelOpen  : false,
    helpSidePanelOpen : false,
    allowDropMenus : false,

    dataExtent : [...GlobalData.defaultTerritoryDataExtent]
  };

  loadData = () =>
  {
    d3.csv(process.env.PUBLIC_URL + "/territory_texts_data.csv").then(csv => {

      let x_csv2 = csv.reduce(map_item_data, {});

      d3.json(process.env.PUBLIC_URL + "/territory_graphical_data.json").then(json => {

        const json_nodes = process_json_nodes(json.nodes, x_csv2);
        const json_node_map = new Map();
        json_nodes.forEach(d => json_node_map.set(d.id, d));

        d3.json(process.env.PUBLIC_URL + "/places_hierarchy.json").then(place_hierarchies_json => {

          const place_hierarchies_info = process_place_hierarchies(
            place_hierarchies_json, 
            json_nodes, 
            json_node_map,
            GlobalData.visualizationColors.territory);

          const textsData = getTextsData(json_nodes);

          this.setState({
            data : {
              json_nodes : json_nodes,
              json_node_map : json_node_map,
              x_csv2 : x_csv2,
              textsData : textsData,
              place_hierarchies_info : place_hierarchies_info
            },
            isLoading : false
          });
        });
      });
    });
  }

  componentDidMount()
  {
    this.loadData();
  }

  containerSetTerritorySetHighlightMode = callback => this.territorySetHighlightMode = callback;
  callTerritorySetHighlightMode = value => 
  {
    switch(value)
    {
      case GlobalData.analysisModes.noAnalysis.chronology    : this.setState({ mainAnalysisMode : GlobalData.analysisModes.noAnalysis, noAnalysisMode : value }); break;
      case GlobalData.analysisModes.noAnalysis.volumes       : this.setState({ mainAnalysisMode : GlobalData.analysisModes.noAnalysis, noAnalysisMode : value }); break;
      case GlobalData.analysisModes.doubt.fog                : this.setState({ mainAnalysisMode : GlobalData.analysisModes.doubt,   doubtAnalysisMode : value }); break;
      case GlobalData.analysisModes.doubt.cancellation       : this.setState({ mainAnalysisMode : GlobalData.analysisModes.doubt,   doubtAnalysisMode : value }); break;
      case GlobalData.analysisModes.doubt.all                : this.setState({ mainAnalysisMode : GlobalData.analysisModes.doubt,   doubtAnalysisMode : value }); break;
      case GlobalData.analysisModes.doubt.percentage         : this.setState({ mainAnalysisMode : GlobalData.analysisModes.doubt,   doubtAnalysisMode : value }); break;
      case GlobalData.analysisModes.shape.proportion         : this.setState({ mainAnalysisMode : GlobalData.analysisModes.shape,   shapeAnalysisMode : value }); break;
      case GlobalData.analysisModes.shape.types              : this.setState({ mainAnalysisMode : GlobalData.analysisModes.shape,   shapeAnalysisMode : value }); break;
      case GlobalData.analysisModes.space.genericCosmic      : this.setState({ mainAnalysisMode : GlobalData.analysisModes.space,   spaceAnalysisMode : value }); break;
      case GlobalData.analysisModes.space.namedCosmic        : this.setState({ mainAnalysisMode : GlobalData.analysisModes.space,   spaceAnalysisMode : value }); break;
      case GlobalData.analysisModes.space.genericTerrestrial : this.setState({ mainAnalysisMode : GlobalData.analysisModes.space,   spaceAnalysisMode : value }); break;
      case GlobalData.analysisModes.space.namedTerrestrial   : this.setState({ mainAnalysisMode : GlobalData.analysisModes.space,   spaceAnalysisMode : value }); break;
      case GlobalData.analysisModes.space.invented           : this.setState({ mainAnalysisMode : GlobalData.analysisModes.space,   spaceAnalysisMode : value }); break;
      case GlobalData.analysisModes.space.noSetting          : this.setState({ mainAnalysisMode : GlobalData.analysisModes.space,   spaceAnalysisMode : value }); break;
      case GlobalData.analysisModes.space.proportion         : this.setState({ mainAnalysisMode : GlobalData.analysisModes.space,   spaceAnalysisMode : value }); break
      case GlobalData.analysisModes.space.placeHierarchies   : this.setState({ mainAnalysisMode : GlobalData.analysisModes.space,   spaceAnalysisMode : value }); break;

      default : throw new Error("error : analysis mode " + value + " not recognized");
    }

    this.territorySetHighlightMode(value);
  }

  setMainAnalysisMode = value => {
    switch(value)
    {
      case GlobalData.analysisModes.noAnalysis : this.callTerritorySetHighlightMode(this.state.noAnalysisMode); break;
      case GlobalData.analysisModes.doubt      : this.callTerritorySetHighlightMode(this.state.doubtAnalysisMode); break;
      case GlobalData.analysisModes.shape      : this.callTerritorySetHighlightMode(this.state.shapeAnalysisMode); break;
      case GlobalData.analysisModes.space      : this.callTerritorySetHighlightMode(this.state.spaceAnalysisMode); break;

      default : throw new Error("setMainAnalysisMode : mainAnalysisMode not recognized");
    }
  }

  territorySvgClicked = () => {
    this.setState({
      noAnalysisDropDownPosition : GlobalData.noAnalysisDropDownPositions.closed,
      itineraryDropUpPosition : GlobalData.itineraryDropUpPositions.closed
    });
  }

  containerSetTerritoryShowHills = callback => this.territoryShowHills = callback;
  callTerritoryShowHills = opacity => this.territoryShowHills(opacity);  

  toggleNoAnalysisDropDownPosition = () =>
  {
    if(!this.state.allowDropMenus) return;

    const newValue =
      this.state.noAnalysisDropDownPosition === GlobalData.noAnalysisDropDownPositions.open ?
      GlobalData.noAnalysisDropDownPositions.closed :
      GlobalData.noAnalysisDropDownPositions.open;

    // if we are opening the drop down, kill the bottom panel
    const bottomPanelPosition = 
      newValue === GlobalData.noAnalysisDropDownPositions.open ? 
      GlobalData.bottomPanelPositions.closed :
      this.state.bottomPanelPosition;

    const bottomPanelMode =
      newValue === GlobalData.noAnalysisDropDownPositions.open ?
      GlobalData.bottomPanelModes.noAnalysis :
      this.state.bottomPanelMode;

    this.setState({ 
      noAnalysisDropDownPosition : newValue, 
      itineraryDropUpPosition : GlobalData.itineraryDropUpPositions.closed,
      bottomPanelPosition : bottomPanelPosition,
      bottomPanelMode : bottomPanelMode
    });
  }

  containerSetAllowDropMenus = value => this.setState({ allowDropMenus : value });

  setNoAnalysisDropDownPosition = value => this.setState({ noAnalysisDropDownPosition : value });

  containerSetNoAnalysisDropDownRadioButtonPressed = callback => this.noAnalysisDropDownRadioButtonPressed = callback;
  callNoAnalysisDropDownRadioButtonPressed = buttonId => this.noAnalysisDropDownRadioButtonPressed(buttonId);

  containerSetTerritorySetDataExtent = callback => this.territorySetDataExtent = callback;
  callTerritorySetDataExtent = extent => {
    this.setState({ dataExtent : extent });
    this.territorySetDataExtent(extent);
  }

  containerSetTerritoryApplyBeeSwarmFilter = callback => this.territoryApplyBeeSwarmFilter = callback;
  callTerritoryApplyBeeSwarmFilter = () => {

    this.setState({ 
      noAnalysisDropDownPosition : GlobalData.noAnalysisDropDownPositions.closed,
      itineraryDropUpPosition : GlobalData.itineraryDropUpPositions.closed
    });    

    this.territoryApplyBeeSwarmFilter();
  }

  containerSetTerritoryApplySearchFilterByInputText = callback => this.territoryApplySearchFilterByInputText = callback;
  callTerritoryApplySearchFilterByInputText = input => {

    this.setState({ 
      noAnalysisDropDownPosition : GlobalData.noAnalysisDropDownPositions.closed,
      itineraryDropUpPosition : GlobalData.itineraryDropUpPositions.closed
    });

    this.territoryApplySearchFilterByInputText(input);
  }

  containerSetTerritoryApplySearchFilterBySearchResults = callback => this.territoryApplySearchFilterBySearchResults = callback;
  callTerritoryApplySearchFilterBySearchResults = (mustReset, searchResults) => {

    this.setState({ 
      noAnalysisDropDownPosition : GlobalData.noAnalysisDropDownPositions.closed,
      itineraryDropUpPosition : GlobalData.itineraryDropUpPositions.closed
    });

    this.territoryApplySearchFilterBySearchResults(mustReset, searchResults);
  }

//  callTerritorySetHillColoringMode = value => this.territorySetHighlightMode(value);


  setBottomPanelMode = value => this.setState({ 
    bottomPanelMode : value,
    noAnalysisDropDownPosition : GlobalData.noAnalysisDropDownPositions.closed
  });    

  toggleBottomPanelPosition = () => 
  {
    const newValue = 
      this.state.bottomPanelPosition === GlobalData.bottomPanelPositions.open ?
      GlobalData.bottomPanelPositions.closed :
      GlobalData.bottomPanelPositions.open;

    this.setState({ 
      bottomPanelPosition : newValue,
      noAnalysisDropDownPosition : GlobalData.noAnalysisDropDownPositions.closed
    });
  }

  setBottomPanelPosition = value => this.setState({ bottomPanelPosition : value });

  containerSetItineraryDropUpRadioButtonPressed = callback => this.itineraryDropUpRadioButtonPressed = callback;
  callItineraryDropUpRadioButtonPressed = buttonId => this.itineraryDropUpRadioButtonPressed(buttonId);

  toggleItineraryDropUpPosition = () =>
  {
    if(!this.state.allowDropMenus) return;

    const newValue =
      this.state.itineraryDropUpPosition === GlobalData.itineraryDropUpPositions.open ?
      GlobalData.itineraryDropUpPositions.closed :
      GlobalData.itineraryDropUpPositions.open;

    const bottomPanelPosition = 
      newValue === GlobalData.itineraryDropUpPositions.open ? 
      GlobalData.bottomPanelPositions.closed :
      this.state.bottomPanelPosition;


    const bottomPanelMode =
      newValue === GlobalData.itineraryDropUpPositions.open ?
      GlobalData.bottomPanelModes.noAnalysis :
      this.state.bottomPanelMode;

    this.setState({ 
      itineraryDropUpPosition : newValue, 
      noAnalysisDropDownPosition : GlobalData.noAnalysisDropDownPositions.closed,
      bottomPanelPosition : bottomPanelPosition,
      bottomPanelMode : bottomPanelMode
    });
  }

  setItineraryDropUpPosition = value => this.setState({ itineraryDropUpPosition : value });

  setDoubtPanelMode = value => this.setState({ doubtPanelMode : value });
  setShapePanelMode = value => this.setState({ shapePanelMode : value });
  setSpacePanelMode = value => this.setState({ spacePanelMode : value });

  toggleHelpSidePanel = () => this.setState({ 
    noAnalysisDropDownPosition : GlobalData.noAnalysisDropDownPositions.closed,
    itineraryDropUpPosition : GlobalData.itineraryDropUpPositions.closed,
    helpSidePanelOpen : !this.state.helpSidePanelOpen 
  });

  onBottomPanelCloseButtonClicked = () => this.setState({ bottomPanelMode : GlobalData.bottomPanelModes.noAnalysis });

  containerToggleCompassPanel = () => this.setState({ compassPanelOpen : !this.state.compassPanelOpen });

  render()
  {
/*    
    if(this.state.compassIsActive)
    {
      return <Compass containerToggleCompass={this.containerToggleCompass} />
    }
*/
    let helpPage;

    switch(this.state.mainAnalysisMode)
    {
      case GlobalData.analysisModes.space      : helpPage = GlobalData.helpPages.territory.space; break;
      case GlobalData.analysisModes.doubt      : helpPage = GlobalData.helpPages.territory.doubt; break;
      case GlobalData.analysisModes.shape      : helpPage = GlobalData.helpPages.territory.shape; break;
      case GlobalData.analysisModes.noAnalysis : helpPage = GlobalData.helpPages.territory.main;  break;

      default:throw new Error("mainAnalysisMode not recognized.");
    }


    
/* 
    let legendPage;

    if(this.state.mainAnalysisMode === GlobalData.analysisModes.noAnalysis)
    {
      switch(this.state.noAnalysisMode)
      {
        case GlobalData.analysisModes.noAnalysis.chronology : legendPage = GlobalData.legendPages.territory.chronology; break;
        case GlobalData.analysisModes.noAnalysis.volumes    : legendPage = GlobalData.legendPages.territory.volumes; break;
        default : throw new Error("noAnalysisMode not recognized : " + this.state.noAnalysisMode);
      }
    }
    else
    {
      switch(this.state.mainAnalysisMode)
      {
        case GlobalData.analysisModes.doubt : legendPage = GlobalData.legendPages.territory.doubt; break;
        case GlobalData.analysisModes.shape : legendPage = GlobalData.legendPages.territory.shape; break;
        case GlobalData.analysisModes.space : legendPage = GlobalData.legendPages.territory.space; break;
        default : throw new Error("mainAnalysisMode not recognized.");
      }
    }
*/

    const legendPage = selectLegendPage(
      this.state.mainAnalysisMode,
      this.state.noAnalysisMode,
      this.state.doubtAnalysisMode,
      this.state.shapeAnalysisMode,
      this.state.spaceAnalysisMode);

    let analysisMode;

    switch(this.state.mainAnalysisMode)
    {
      case GlobalData.analysisModes.noAnalysis : analysisMode = this.state.noAnalysisMode;    break;
      case GlobalData.analysisModes.doubt      : analysisMode = this.state.doubtAnalysisMode; break;
      case GlobalData.analysisModes.space      : analysisMode = this.state.spaceAnalysisMode; break;
      case GlobalData.analysisModes.shape      : analysisMode = this.state.shapeAnalysisMode; break;

      default : throw new Error("mainAnalysisMode not recognized : " + this.state.mainAnalysisMode);
    }

    return (
      <div className="main">

        <HelpSidePanel
          open={this.state.helpSidePanelOpen}
          page={helpPage}
          closeButtonClicked={this.toggleHelpSidePanel} />

        <CompassPanel
          open={this.state.compassPanelOpen}
          containerToggleCompassPanel={this.containerToggleCompassPanel} />

        <>

        <TerritoryHeader
          isLoading={this.state.isLoading}
          mainAnalysisMode={this.state.mainAnalysisMode}
          noAnalysisMode={this.state.noAnalysisMode}
          textsData={this.state.data.textsData}
          callTerritorySetHighlightMode={this.callTerritorySetHighlightMode}
          callTerritoryApplySearchFilterByInputText={this.callTerritoryApplySearchFilterByInputText}
          callTerritoryApplySearchFilterBySearchResults={this.callTerritoryApplySearchFilterBySearchResults}
          helpButtonClicked={this.toggleHelpSidePanel}
          toggleNoAnalysisDropDownPosition={this.toggleNoAnalysisDropDownPosition}
          containerSetNoAnalysisDropDownRadioButtonPressed={this.containerSetNoAnalysisDropDownRadioButtonPressed}
          containerToggleCompassPanel={this.containerToggleCompassPanel}
        />

        {this.state.noAnalysisDropDownPosition === GlobalData.noAnalysisDropDownPositions.open &&
        <TerritoryNoAnalysisDropDown
          mainAnalysisMode={this.state.mainAnalysisMode}
          noAnalysisMode={this.state.noAnalysisMode}
          callStateContainerToggleButtonPressed={this.callNoAnalysisDropDownRadioButtonPressed}
        />
        }

        <div className="territory-body">

        {!this.state.isLoading &&          

              <Territory
                analysisMode = {analysisMode}
                data={this.state.data}
                colors={GlobalData.visualizationColors.territory}
                containerSetAllowDropMenus={this.containerSetAllowDropMenus}
                containerSetTerritorySetHighlightMode={this.containerSetTerritorySetHighlightMode}
                containerSetTerritoryShowHills={this.containerSetTerritoryShowHills}
                containerSetTerritorySetDataExtent={this.containerSetTerritorySetDataExtent}
                containerSetTerritoryApplyBeeSwarmFilter={this.containerSetTerritoryApplyBeeSwarmFilter}
                containerSetTerritoryApplySearchFilterByInputText={this.containerSetTerritoryApplySearchFilterByInputText}
                containerSetTerritoryApplySearchFilterBySearchResults={this.containerSetTerritoryApplySearchFilterBySearchResults}
                containerOnSvgClicked={this.territorySvgClicked}
              />

        }

              {this.state.itineraryDropUpPosition === GlobalData.itineraryDropUpPositions.open &&

              <TerritoryItinerariesDropUp
                callStateContainerRadioButtonPressed={this.callItineraryDropUpRadioButtonPressed}
              />

              }

              {this.state.bottomPanelMode !== GlobalData.bottomPanelModes.noAnalysis &&

              <TerritoryBottomPanel

                bottomPanelMode={this.state.bottomPanelMode}
                bottomPanelPosition={this.state.bottomPanelPosition}
                containerSetBottomPanelMode={this.setBottomPanelMode}

                doubtPanelMode={this.state.doubtPanelMode}
                containerSetDoubtPanelMode={this.setDoubtPanelMode}

                shapePanelMode={this.state.shapePanelMode}
                containerSetShapePanelMode={this.setShapePanelMode}

                spacePanelMode={this.state.spacePanelMode}
                containerSetSpacePanelMode={this.setSpacePanelMode}

                noAnalysisMode={this.state.noAnalysisMode}
                doubtAnalysisMode={this.state.doubtAnalysisMode}
                shapeAnalysisMode={this.state.shapeAnalysisMode}
                spaceAnalysisMode={this.state.spaceAnalysisMode}

                legendPage={legendPage}

                data={this.state.data}
                dataExtent={this.state.dataExtent}

                setMainAnalysisMode={this.setMainAnalysisMode}
                callTerritorySetHighlightMode={this.callTerritorySetHighlightMode}
                callTerritoryShowHills={this.callTerritoryShowHills}
                callTerritorySetDataExtent={this.callTerritorySetDataExtent}
                callTerritoryApplyBeeSwarmFilter={this.callTerritoryApplyBeeSwarmFilter}
                onCloseButtonClicked={this.onBottomPanelCloseButtonClicked}
              />
              }

     {/*     <TerritoryStepsPanel callTerritorySetHighlightMode={this.callTerritorySetHighlightMode} /> */}

        </div>

        </>

        

        <TerritoryFooter
          mainAnalysisMode={this.state.mainAnalysisMode}
          bottomPanelMode={this.state.bottomPanelMode}
          dataExtent={this.state.dataExtent}
          setMainAnalysisMode={this.setMainAnalysisMode}
          setBottomPanelMode={this.setBottomPanelMode}
          toggleBottomPanelPosition={this.toggleBottomPanelPosition}
          setBottomPanelPosition={this.setBottomPanelPosition}
          toggleItineraryDropUpPosition={this.toggleItineraryDropUpPosition}
          setItineraryDropUpPosition={this.setItineraryDropUpPosition}
          containerSetItineraryDropUpRadioButtonPressed={this.containerSetItineraryDropUpRadioButtonPressed}
        />

      </div>
    );
  }
}

function selectLegendPage(
  mainAnalysisMode, 
  noAnalysisMode,
  doubtAnalysisMode,
  shapeAnalysisMode,
  spaceAnalysisMode)
{
  let legendPage;

  switch(true)
  {
    case 
      mainAnalysisMode === GlobalData.analysisModes.noAnalysis &&
      noAnalysisMode   === GlobalData.analysisModes.noAnalysis.chronology :

      legendPage = GlobalData.legendPages.territory.chronology;
      break;

    case 
      mainAnalysisMode === GlobalData.analysisModes.noAnalysis &&
      noAnalysisMode   === GlobalData.analysisModes.noAnalysis.volumes :

      legendPage = GlobalData.legendPages.territory.volumes;
      break;

    case mainAnalysisMode === GlobalData.analysisModes.doubt && 
      [
        GlobalData.analysisModes.doubt.fog,
        GlobalData.analysisModes.doubt.cancellation,
        GlobalData.analysisModes.doubt.all
      ].includes(doubtAnalysisMode) : 
      
      legendPage = GlobalData.legendPages.territory.doubtOccurrences; 
      break;

    case 
      mainAnalysisMode  === GlobalData.analysisModes.doubt &&
      doubtAnalysisMode === GlobalData.analysisModes.doubt.percentage : 

      legendPage = GlobalData.legendPages.territory.doubtProportion;
      break;

    case
      mainAnalysisMode  === GlobalData.analysisModes.shape &&
      shapeAnalysisMode === GlobalData.analysisModes.shape.types :

      legendPage = GlobalData.legendPages.territory.shapeProportion1;
      break;

    case
      mainAnalysisMode  === GlobalData.analysisModes.shape &&
      shapeAnalysisMode === GlobalData.analysisModes.shape.proportion :

      legendPage = GlobalData.legendPages.territory.shapeProportion2;
      break;
    
    case
      mainAnalysisMode === GlobalData.analysisModes.space &&
      [
        GlobalData.analysisModes.space.genericCosmic,
        GlobalData.analysisModes.space.namedCosmic,
        GlobalData.analysisModes.space.genericTerrestrial,
        GlobalData.analysisModes.space.namedTerrestrial,
        GlobalData.analysisModes.space.invented,
        GlobalData.analysisModes.space.noSetting,
      ].includes(spaceAnalysisMode) :

      legendPage = GlobalData.legendPages.territory.spaceOccurrences;
      break;

    case 
      mainAnalysisMode  === GlobalData.analysisModes.space &&
      spaceAnalysisMode === GlobalData.analysisModes.space.proportion :

      legendPage = GlobalData.legendPages.territory.spaceProportion;
      break;

    case
      mainAnalysisMode  === GlobalData.analysisModes.space &&
      spaceAnalysisMode === GlobalData.analysisModes.space.placeHierarchies :

      legendPage = GlobalData.legendPages.territory.spaceHierarchies;
      break;

    default : throw new Error("legend - analysis mode not mapped");
  }
  
  return legendPage;
}

function interpolateSpline(x)
{
	let y;

	// The cubic spline interpolation has been calculated "heuristically" by using this service:
	// https://tools.timodenk.com/cubic-spline-interpolation

	// Inserted values are:
	// x, y
	// 0, 0
	// 0.1, 0.2
	// 0.55, 0.65
	// 0.8, 0.8
	// 1, 1

	if(x >= 0 && x <= 0.1) {
		y = (-8.7269 * Math.pow(x, 3)) + (1.1764 * Math.pow(10, -60) * Math.pow(x, 2)) + (2.0873 * x) + (0);
	} else if(x > 0.1 && x <= 0.55) {
		y = (1.7416 * Math.pow(x, 3)) + (-3.1405 * Math.pow(x, 2)) + (2.4013 * x) + (-1.0468 * Math.pow(10, -2));
	} else if(x > 0.55 && x <= 0.8) {
		y = (2.2326 * Math.pow(x, 3)) + (-3.9507 * Math.pow(x, 2)) + (2.8469 * x) + (-9.2166 * Math.pow(10, -2));
	} else if(x > 0.8 && x <= 1) {
		y = (-2.3458 * Math.pow(x, 3)) + (7.0374 * Math.pow(x, 2)) + (-5.9436 * x) + (2.2520);
	} else {
		y = x;
	}

	return y;
}

function process_json_nodes(all_json_nodes, x_csv2)
{
  let json_nodes = all_json_nodes.filter(function(item) {

    return (
      GlobalData.allowedCollections === "all" ||
      (GlobalData.allowedCollectionsSplit.includes("undefined") && item.attributes.collections === undefined) ||
      array_intersection(GlobalData.allowedCollectionsSplit, item.attributes.collections).length > 0
    );

  });

  json_nodes.forEach(
    function(n)
    {
      // fix orientation of the viz
      n.y *= -1;
      // n.x*=-1;
      // handle collections
      if(n.attributes.collections) {
        n.attributes.collections = n.attributes.collections.split(';');
        // remove last element which is always empty due to the fat that all records end with a ";"
        n.attributes.collections.pop();
      } else {
        n.attributes.collections = [];
      }
    });

  // sort json_nodes so to have the upper in the background and not covering the ones in the foreground
  json_nodes = json_nodes.sort((a, b) => a.y - b.y);

  const json_nodes_size_extent = d3.extent(all_json_nodes, d => d.size);
  const json_nodes_min_size = json_nodes_size_extent[0] / 8;

  json_nodes.forEach(d => create_item_steps(d, json_nodes_min_size, x_csv2));

  return json_nodes;
}

function process_place_hierarchies(place_hierarchies_json, json_nodes, json_node_map, colors)
{
  const place_hierarchies = new Map();
  const place_hierarchy_node_info_map = new Map();

  const center = { x : 0, y : 0 };

  place_hierarchies_json.hierarchies.forEach(d => {
    if(d.caption !== "Terra" && d.caption !== "S152")
    {
      const j = json_node_map.get(d.caption);

      // if we have restricted the json_nodes via allowedCollections, some j values will be null : nothing to do in these iterations
      if(!j) return;

      const radiusScaleFactor = j.steps[0].r / 30;

      place_hierarchies.set(d.caption, prepare_jellyfish_data(d, center, radiusScaleFactor, GlobalData.visualizationColors.territory));

      visit(d, {}, (jn, status) => place_hierarchy_node_info_map.set(jn.node_id, {}));
    }
  });

  const place_hierarchies_graphics_items = place_hierarchies_json.hierarchies.map(
    d => {
      const text_group = {
        caption : d.caption,
        graphical_ops : []
      };

      return text_group;
    });

	const place_hierarchies_graphics_item_map = new Map();

	place_hierarchies_graphics_items.forEach(d => {
		const place_hierarchy = place_hierarchies.get(d.caption);
		if(place_hierarchy)
		{
			draw_jellyfish(
        d.graphical_ops, 
        place_hierarchy, 
        place_hierarchy.circle_position, 
        place_hierarchy.caption, 
        json_node_map, 
        colors);

			place_hierarchies_graphics_item_map.set(d.caption, d);
		}
	});

	json_nodes.forEach(d => {
		const item = place_hierarchies_graphics_item_map.get(d.id);
		if(item)
		{
			item.x = d.x;
			item.y = d.y;
		}
	});

	place_hierarchies_graphics_items.forEach(d => {
		const jn = json_node_map.get(d.caption);

		if(jn)
		{
			d.n_steps = jn.steps.length;
			d.graphical_ops.forEach(grop => {
				grop.hill_size = jn.size;
				if(grop.caption_segments)
				{
					grop.caption_segments.forEach(cs => {
						cs.hill_size = jn.size;
					});
				}
			});
//			d.r = jn.steps[0].r;
		}
	});

  const place_hierarchies_info = {
    place_hierarchies                   : place_hierarchies,
    place_hierarchy_node_info_map       : place_hierarchy_node_info_map,
    place_hierarchies_graphics_items    : place_hierarchies_graphics_items,
    place_hierarchies_graphics_item_map : place_hierarchies_graphics_item_map
  };

  return place_hierarchies_info;
}

function getTextsData(json_nodes)
{
  const collectionMap = new Map();

  GlobalData.collections.forEach(coll => collectionMap.set(coll.id, coll.n));

  const textCollectionsMap = new Map();

  json_nodes.forEach(d => {

    if(!textCollectionsMap.get(d.id)) textCollectionsMap.set(d.id, []);

    d.attributes.collections.forEach(coll_id => {
      if(!textCollectionsMap.get(d.id).includes(coll_id)) textCollectionsMap.get(d.id).push(collectionMap.get(coll_id));
    });
  });

  const title_fn = d => d.attributes.title + " - " + textCollectionsMap.get(d.id).join(" ");

  const textsData = { options : json_nodes.map(d => ({ label : d.attributes.title, id : d.id, desc : title_fn(d), status : false })) };

  return textsData;
}

function create_item_steps(d, json_nodes_min_size, x_csv2)
{
  // reverse the order of collections, so to have the older ones at the bottom of the hills
  d.attributes.collections = d.attributes.collections.reverse()

  d.steps = [];
  // get different radii
  for(var jj = (json_nodes_min_size); jj <= d.size; jj += json_nodes_min_size) {
    let new_step_size = jj;
    let ratio = new_step_size / d.size;
    new_step_size = d.size * interpolateSpline(ratio);
    d.steps.push(new_step_size);
  }

  const step_increment = -23;

  // get colors
  d.steps = d.steps.map((s, i) => {

    // assign to each step a collection
    const pos_1 = i / d.steps.length;
    const pos_2 = pos_1 * d.attributes.collections.length;
    const collection_here = d.attributes.collections[Math.floor(pos_2)];
    const first_elem = (i === (d.steps.length - 1));
    const last_elem = (i === 0);
    const n_steps = d.steps.length;
    const csv_item = x_csv2[d.id];
    const step_index = n_steps - i - 1;
    const step_y = step_index * step_increment;

    return {
      'r': s,
      'collection': collection_here,
      'first_publication': d.attributes.first_publication,
      'id': d.id,
      'first_elem': first_elem,
      'last_elem': last_elem,
      'n_steps': n_steps,
      'step_index': step_index,
      'step_y': step_y,

      'generico_cosmico': csv_item === undefined ? 0 : csv_item.generico_cosmico,
      'n_generico_cosmico': csv_item === undefined ? 0 : csv_item.n_generico_cosmico,

      'generico_terrestre': csv_item === undefined ? 0 : csv_item.generico_terrestre,
      'n_generico_terrestre': csv_item === undefined ? 0 : csv_item.n_generico_terrestre,

      'inventato': csv_item === undefined ? 0 : csv_item.inventato,
      'n_inventato': csv_item === undefined ? 0 : csv_item.n_inventato,

      'no_ambientazione': csv_item === undefined ? 0 : csv_item.no_ambientazione,
      'n_no_ambientazione': csv_item === undefined ? 0 : csv_item.n_no_ambientazione,

      'nominato_cosmico': csv_item === undefined ? 0 : csv_item.nominato_cosmico,
      'n_nominato_cosmico': csv_item === undefined ? 0 : csv_item.n_nominato_cosmico,

      'nominato_terrestre': csv_item === undefined ? 0 : csv_item.nominato_terrestre,
      'n_nominato_terrestre': csv_item === undefined ? 0 : csv_item.n_nominato_terrestre,

      'nebbia_normalizzata': csv_item === undefined ? 0 : csv_item.nebbia_normalizzata,
      'cancellazione_normalizzata': csv_item === undefined ? 0 : csv_item.cancellazione_normalizzata,
      'nebbia': csv_item === undefined ? 0 : csv_item.nebbia,
      'cancellazione': csv_item === undefined ? 0 : csv_item.cancellazione,
      'norma_pct_caratteri_nebbia_cancellazione': csv_item === undefined ? 0 : csv_item.norma_pct_caratteri_nebbia_cancellazione,

      'nebbia_words_ratio': csv_item === undefined ? 0 : csv_item.nebbia_words_ratio,
      'cancellazione_words_ratio': csv_item === undefined ? 0 : csv_item.cancellazione_words_ratio,
      'dubitative_ratio': csv_item === undefined ? 0 : csv_item.dubitative_ratio,

      'lists_f_ratio': csv_item === undefined ? 0 : csv_item.lists_f_ratio,
      'lists_m_ratio': csv_item === undefined ? 0 : csv_item.lists_m_ratio,
      'lists_p_ratio': csv_item === undefined ? 0 : csv_item.lists_p_ratio,
      'lists_s_ratio': csv_item === undefined ? 0 : csv_item.lists_s_ratio,

      'lists_are_present': csv_item === undefined ? 0 : csv_item.lists_are_present,
      'lists_ratio_with_threshold': csv_item === undefined ? 0 : csv_item.lists_ratio_with_threshold,
      'lists_ratio_is_below_threshold': csv_item === undefined ? false : csv_item.lists_ratio_is_below_threshold
    };
  });

  // sort array so to have little circles on top, big at bottom
  d.steps = d.steps.reverse();

  return d.steps;
}

function map_item_data(map, obj)
{
  map[obj.id] = calculate_item_data(obj);

  return map;
};

function calculate_item_data(obj)
{
  const lists_sum = (+obj.n_lists_f) + (+obj.n_lists_m) + (+obj.n_lists_p) + (+obj.n_lists_s);
  const text_length = +obj.text_length;
  const lists_ratio_threshold = 0.04;
  const lists_ratio = lists_sum / text_length;

  let item_data = {
    generico_cosmico: (+obj.generico_cosmico),
    n_generico_cosmico: +obj.n_generico_cosmico,

    generico_terrestre: (+obj.generico_cosmico) + (+obj.generico_terrestre),
    n_generico_terrestre: +obj.n_generico_terrestre,

    inventato: (+obj.generico_cosmico) + (+obj.generico_terrestre) + (+obj.inventato),
    n_inventato: +obj.n_inventato,

    no_ambientazione: (+obj.generico_cosmico) + (+obj.generico_terrestre) + (+obj.inventato) + (+obj.no_ambientazione),
    n_no_ambientazione: +obj.n_no_ambientazione,

    nominato_cosmico: (+obj.generico_cosmico) + (+obj.generico_terrestre) + (+obj.inventato) + (+obj.no_ambientazione) + (+obj.nominato_cosmico),
    n_nominato_cosmico: +obj.n_nominato_cosmico,

    nominato_terrestre: (+obj.generico_cosmico) + (+obj.generico_terrestre) + (+obj.inventato) + (+obj.no_ambientazione) + (+obj.nominato_cosmico) + (+obj.nominato_terrestre),
    n_nominato_terrestre: +obj.n_nominato_terrestre,

    nebbia_normalizzata: (+obj.pct_nebbia_normalizzata),
    cancellazione_normalizzata: (+obj.pct_cancellazione_normalizzata),

    nebbia: (+obj.pct_nebbia / 100),
    cancellazione: (+obj.pct_nebbia / 100) + (+obj.pct_cancellazione / 100),

    norma_pct_caratteri_nebbia_cancellazione: (+obj.norma_pct_caratteri_nebbia_cancellazione),

    nebbia_words_ratio: (+obj.nebbia_words_ratio),
    cancellazione_words_ratio: (+obj.cancellazione_words_ratio),
    dubitative_ratio: (+obj.dubitative_ratio),

    lists_f_ratio: lists_sum === 0 ? 0 : (+obj.n_lists_f) / lists_sum,
    lists_m_ratio: lists_sum === 0 ? 0 : ((+obj.n_lists_f) + (+obj.n_lists_m)) / lists_sum,
    lists_p_ratio: lists_sum === 0 ? 0 : ((+obj.n_lists_f) + (+obj.n_lists_m) + (+obj.n_lists_p)) / lists_sum,
    lists_s_ratio: lists_sum === 0 ? 0 : ((+obj.n_lists_f) + (+obj.n_lists_m) + (+obj.n_lists_p) + (+obj.n_lists_s)) / lists_sum,

    lists_are_present: lists_sum > 0,
    lists_ratio_with_threshold: Math.max(lists_ratio_threshold, lists_ratio),
    lists_ratio_is_below_threshold: lists_ratio < lists_ratio_threshold,
  };

  return item_data;
}

function array_intersection(a1, a2)
{
	let result = [];

	if(a1 === undefined || a1.length === 0 || a2 === undefined || a2.length === 0) return result;

	for(let i = 0; i < a1.length; ++i) {
		let item = a1[i];

		if(a2.includes(item))
			result.push(item);
	}

	return result;
}
