import React, { Component } from "react";
import MainMenu from "../../general/MainMenu";
import PageTitle from "../../general/PageTitle";
import MoreInfo from "../../general/MoreInfo";
import CompassButton from "../../general/CompassButton/CompassButton";
import Search from "../../general/Search";
import Loading from "../../general/Loading";

import AltOptions from "../../general/Options/AltOptions";
import MarimekkoViz from "./MarimekkoViz";
import marimekkoData from "./marimekko.json";
import volumi from "./volumi.json";

const searchOptions = volumi.map(item => ({label: item.titolo, value: item.textID}))

console.log("searchOptions", searchOptions)



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
  };

  setCurrentTextID = (currentTextID) => {
    const oldValue = this.state.currentTextID
    if(currentTextID === oldValue){
      return
    }
    const newState = {currentTextID, controlsEnabled: !currentTextID}
    this.setState(newState)
  }

  changeRicerca = (newOptions) => {
    this.setState({ricerca: newOptions.map(x => x.value)})

  }

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
    } = this.state;

    return (
      <div className="trasformare main">
        <div className="top-nav navigations">
          <MainMenu className="main-menu" style={{ gridColumn: "span 1" }} />
          <PageTitle
            title={"LA STRUTTURA DEI VOLUMI"}
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
              style={{ gridColumn: "span 3" }}
            />
          )}

          {this.state.isLoading && <Loading style={{ gridColumn: "span 8" }} />}
          {!this.state.isLoading && (
            <Search
              style={{ gridColumn: "span 8", pointerEvents: currentTextID ? 'none' : undefined }}
              data={{options:searchOptions}}
              changeOptions={this.changeRicerca}
            />
          )}
          <MoreInfo
            style={{ gridColumn: "span 1" }}
            onClicked={() => {
               alert("clicked!")
            }}
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
          <MarimekkoViz
            data={marimekkoData}
            dettaglio={dettaglio}
            aggregazione={aggregazione}
            ricerca={ricerca}
            setOptionsForDetail={() => {
              if(this.state.aggregazione !== "non aggregato" || this.state.dettaglio !== "categorie"){
                this.setState({aggregazione: "non aggregato", dettaglio: "categorie"})
            }}}
            tipologia={tipologia}
            currentTextID={currentTextID}
            setCurrentTextID={this.setCurrentTextID}
          />
        </div>

        <div className="bottom-nav navigations">
          <AltOptions
            title="Tipologia"
            multiple
            disabled={!controlsEnabled}
            options={tipologiaOptions}
            style={{ gridColumn: "span 8", textAlign: "center" }}
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
            style={{ gridColumn: "span 8", textAlign: "center" }}
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
            style={{ gridColumn: "span 8", textAlign: "center" }}
          />
        </div>
      </div>
    );
  }
}

export default Trama;
