import React, { Component } from "react";
import MainMenu from "../../general/MainMenu";
import PageTitle from "../../general/PageTitle";
import MoreInfo from "../../general/MoreInfo";
import CompassButton from "../../general/CompassButton/CompassButton";
import SearchDropDown from "../../general/Search/SearchDropDown";
import Loading from "../../general/Loading";
import HelpSidePanel from "../../panels/HelpSidePanel/HelpSidePanel";

import AltOptions from "../../general/Options/AltOptions";
import MarimekkoViz from "./MarimekkoViz";
import marimekkoData from "./marimekko.json";

import volumi from "./volumi.json";
import GlobalData from "../../utilities/GlobalData";

// const marimekkoData = MD.filter(x => x.textID === "V005")



const searchOptions = volumi.map(item => ({
  label: item.titolo,
  value: item.textID
}));

const tipologiaOptions = [
  { label: "uno" },
  { label: "due" },
  { label: "tre" },
  { label: "quattro" },
  { label: "cinque" }
];

const dettaglioOptions = [{ label: "ambito" }, { label: "categorie" }];

const aggregazioneOptions = [
  { label: "aggregato" },
  { label: "non aggregato" }
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

    const helpPage = GlobalData.helpPages.combine.main;

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
            title={"Combinare"}
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
              color: "black",
              backgroundColor: "white"
            }}
          />
        </div>

        <div className="the-body-viz">
          <MarimekkoViz
            data={marimekkoData}
            dettaglio={dettaglio}
            aggregazione={aggregazione}
            ricerca={ricerca}
            setOptionsForDetail={() => {
              if (
                this.state.aggregazione !== "non aggregato" ||
                this.state.dettaglio !== "categorie"
              ) {
                this.setState({
                  aggregazione: "non aggregato",
                  dettaglio: "categorie"
                });
              }
            }}
            tipologia={tipologia}
            currentTextID={currentTextID}
            setCurrentTextID={this.setCurrentTextID}
          />
        </div>

        <div className="bottom-nav navigations">
          <AltOptions
            title="Numero di livelli nel testo"
            multiple
            disabled={!controlsEnabled}
            options={tipologiaOptions}
            allLink="tutti"
            style={{
              gridColumn: "span 8",
              textAlign: "center",
              pointerEvents: !controlsEnabled ? "none" : undefined,
              opacity: !controlsEnabled ? 0.4 : undefined
            }}
            allowEmpty={false}
            value={tipologia}
            onChange={tipologia => {
              this.setState({ tipologia: tipologia.map(x => x.label) });
            }}
          />

          <AltOptions
            title="Dettaglio"
            allowEmpty={false}
            disabled={!controlsEnabled}
            value={dettaglio}
            onChange={x => {
              this.setState({ dettaglio: x.label });
            }}
            options={dettaglioOptions}
            style={{
              gridColumn: "span 8",
              textAlign: "center",
              pointerEvents: !controlsEnabled ? "none" : undefined,
              opacity: !controlsEnabled ? 0.4 : undefined
            }}
          />

          <AltOptions
            title="Aggregazione"
            allowEmpty={false}
            disabled={!controlsEnabled}
            value={aggregazione}
            onChange={x => {
              this.setState({ aggregazione: x.label });
            }}
            options={aggregazioneOptions}
            style={{
              gridColumn: "span 8",
              textAlign: "center",
              pointerEvents: !controlsEnabled ? "none" : undefined,
              opacity: !controlsEnabled ? 0.4 : undefined
            }}
          />
        </div>
      </div>
    );
  }
}

export default Trama;
