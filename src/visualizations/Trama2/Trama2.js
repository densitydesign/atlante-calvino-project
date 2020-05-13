import React, { Component } from "react";
import MainMenu from "../../general/MainMenu";
import PageTitle from "../../general/PageTitle";
import MoreInfo from "../../general/MoreInfo";
import CompassButton from "../../general/CompassButton/CompassButton";
import SearchDropDown from "../../general/Search/SearchDropDown";
import Loading from "../../general/Loading";
import HelpSidePanel from "../../panels/HelpSidePanel/HelpSidePanel";

import AltOptions from "../../general/Options/AltOptions";
import GlobalData from "../../utilities/GlobalData";


const searchOptions = []

const tipologiaOptions = [
  { label: "uno" },
  { label: "due" },
  { label: "tre" },
  { label: "quattro" },
  { label: "cinque" }
];


const cercaOptions = [{ label: "volume" }];

class Trama extends Component {
  state = {
    isLoading: false,
    booksData: null,

    cercaPer: "volume",
    dettaglio: "ambito",
    aggregazione: "aggregato",
    tipologia: tipologiaOptions.map(x => x.label),
    ricerca: [],

    controlsEnabled: true,
    currentTextID: null,

    helpSidePanelOpen: false
  };

  setCurrentTextID = currentTextID => {
    const oldValue = this.state.currentTextID;
    if (currentTextID === oldValue) {
      return;
    }
    const newState = { currentTextID, controlsEnabled: !currentTextID };
    this.setState(newState);
  };

  changeRicerca = newOptions => {
    this.setState({ ricerca: newOptions.map(x => x.value) });
  };

  toggleHelpSidePanel = () =>
    this.setState({
      helpSidePanelOpen: !this.state.helpSidePanelOpen
    });

  componentDidMount() {}

  render() {
    const {
      cercaPer,
      dettaglio,
      aggregazione,
      tipologia,
      ricerca,
      controlsEnabled,
      currentTextID,
      helpSidePanelOpen
    } = this.state;

    const { title } = this.props

    const helpPage = GlobalData.helpPages.plot.main;

    return (
      <div className="trasformare main">
        <HelpSidePanel
          open={helpSidePanelOpen}
          page={helpPage}
          closeButtonClicked={this.toggleHelpSidePanel}
        />

        <div className="top-nav navigations">
          <MainMenu className="main-menu" style={{ gridColumn: "span 1" }} />
          <PageTitle
            title={title}
            style={{ gridColumn: "span 10" }}
          />

          {this.state.isLoading && <Loading style={{ gridColumn: "span 3" }} />}
          {!this.state.isLoading && (
            <AltOptions
              title="Cerca per"
              options={cercaOptions}
              disabled={true}
              value={cercaPer}
              onChange={x => {
                this.setState({ cercaPer: x.label });
              }}
              style={{
                gridColumn: "span 3",
                pointerEvents: !controlsEnabled ? "none" : undefined,
                opacity: !controlsEnabled ? 0.4 : undefined
              }}
            />
          )}

          {this.state.isLoading && <Loading style={{ gridColumn: "span 8" }} />}
          {!this.state.isLoading && (
            <SearchDropDown
              style={{
                gridColumn: "span 8",
                pointerEvents: currentTextID ? "none" : undefined
              }}
              data={{ options: searchOptions }}
              changeOptions={this.changeRicerca}
              selectedOptions={this.state.ricerca}
            />
          )}
          <MoreInfo
            style={{ gridColumn: "span 1" }}
            onClicked={this.toggleHelpSidePanel}
          />
          <CompassButton
            style={{
              gridColumn: "span 1",
              color: "white",
              backgroundColor: "black"
            }}
          />
        </div>

        <div className="the-body-viz">
          
        </div>

        <div className="bottom-nav navigations">
          
        </div>
      </div>
    );
  }
}

export default Trama;
