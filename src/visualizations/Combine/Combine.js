import React, { Component } from "react";
import MainMenu from "../../general/MainMenu";
import PageTitle from "../../general/PageTitle";
import MoreInfo from "../../general/MoreInfo";
import Bussola from "../../general/Bussola";
import Search from '../../general/Search';
import Loading from "../../general/Loading";

import AltOptions  from "../../general/Options/AltOptions";


const tipologiaOptions = [
    { label : "tutti" },
    { label : "uno" },
    { label : "due" },
    { label : "tre" },
    { label : "quattro" },
    { label : "cinque" },
]

const dettaglioOptions = [
    { label : "ambito" },
    { label : "categorie" },
]

const aggregazioneOptions = [
    { label : "aggregato" },
    { label : "non aggregato" },
]

const cercaOptions = [
  { label : "titolo" },
  { label : "boh" },
]



class Combine extends Component {
  state = {
    isLoading: false
  };

  render() {
    return (
      <div className="trasformare main">
        <div className="top-nav navigations">
          <MainMenu className="main-menu" style={{ gridColumn: "span 1" }} />
          <PageTitle title={"Hello combine :)"} style={{ gridColumn: "span 10" }} />

          {this.state.isLoading && <Loading style={{ gridColumn: "span 3" }} />}
          {!this.state.isLoading && (
            <AltOptions
              title="Cerca per"
              options={cercaOptions}
              value={'titolo'}
              style={{ gridColumn: "span 3" }}
            />
          )}

          {this.state.isLoading && <Loading style={{ gridColumn: "span 8" }} />}
          {!this.state.isLoading && (
            <Search
              style={{ gridColumn: "span 8" }}
              data={{options:[]}}
              changeOptions={this.changeRicerca}
            />
          )}
          <MoreInfo style={{ gridColumn: "span 1" }} />
          <Bussola style={{ gridColumn: "span 1" }} />
        </div>

        <div className="bottom-nav navigations">
          <AltOptions
            title="Tipologia"
            multiple
            options={tipologiaOptions}
            style={{ gridColumn: "span 8", textAlign: "center" }}
            onChange={(tipologia) => { console.log("tipologiaChanged", tipologia) }}
            
          />

          <AltOptions
            title="Dettaglio"
            options={dettaglioOptions}
            style={{ gridColumn: "span 8", textAlign: "center" }}
            
          />

          <AltOptions
            title="Aggregazioni"
            options={aggregazioneOptions}
            style={{ gridColumn: "span 8", textAlign: "center" }}
            
          />
        </div>
      </div>
    );
  }
}

export default Combine;
