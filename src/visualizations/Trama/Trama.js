import React, { Component } from "react"
import { withTranslation } from "react-i18next"
import MainMenu from "../../general/MainMenu"
import PageTitle from "../../general/PageTitle"
import MoreInfo from "../../general/MoreInfo"
import CompassButton from "../../general/CompassButton/CompassButton"
import SearchDropDown from "../../general/Search/SearchDropDown"
import Loading from "../../general/Loading"
import HelpSidePanel from "../../panels/HelpSidePanel/HelpSidePanel"

import AltOptions from "../../general/Options/AltOptions"
import MarimekkoViz from "./MarimekkoViz"
import marimekkoData from "./marimekko.json"

import volumi from "./volumi.json"
import GlobalData from "../../utilities/GlobalData"

// const marimekkoData = MD.filter(x => x.textID === "V005")

const searchOptions = volumi.map((item) => ({
  label: item.titolo,
  value: item.textID,
}))

class Trama extends Component {
  state = {
    isLoading: false,
    booksData: null,

    cercaPer: "volume",
    dettaglio: "ambito",
    aggregazione: "aggregato",
    tipologia: ["uno", "due", "tre", "quattro", "cinque"],
    ricerca: [],

    controlsEnabled: true,
    currentTextID: null,

    helpSidePanelOpen: true,
  }

  setCurrentTextID = (currentTextID) => {
    const oldValue = this.state.currentTextID
    if (currentTextID === oldValue) {
      return
    }
    const newState = { currentTextID, controlsEnabled: !currentTextID }
    this.setState(newState)
  }

  changeRicerca = (newOptions) => {
    this.setState({ ricerca: newOptions.map((x) => x.value) })
  }

  toggleHelpSidePanel = () =>
    this.setState({
      helpSidePanelOpen: !this.state.helpSidePanelOpen,
    })

  componentDidMount() {}

  render() {
    const { t } = this.props
    const {
      cercaPer,
      dettaglio,
      aggregazione,
      tipologia,
      ricerca,
      controlsEnabled,
      currentTextID,
      helpSidePanelOpen,
    } = this.state

    const helpPage = GlobalData.helpPages.combine.main

    const tipologiaOptions = [
      { label: t("combining:ui.uno"), value: "uno" },
      { label: t("combining:ui.due"), value: "due" },
      { label: t("combining:ui.tre"), value: "tre" },
      { label: t("combining:ui.quattro"), value: "quattro" },
      { label: t("combining:ui.cinque"), value: "cinque" },
    ]

    const dettaglioOptions = [
      { label: t("combining:ui.ambito"), value: "ambito" },
      { label: t("combining:ui.categorie"), value: "categorie" },
    ]

    const aggregazioneOptions = [
      { label: t("combining:ui.aggregato"), value: "aggregato" },
      { label: t("combining:ui.non_aggregato"), value: "non aggregato" },
    ]

    const cercaOptions = [{ label: t("combining:ui.volume"), value: "volume" }]

    return (
      <div className="trasformare main">
        <HelpSidePanel
          open={helpSidePanelOpen}
          page={helpPage}
          closeButtonClicked={this.toggleHelpSidePanel}
        />

        <div className="top-nav navigations">
          <MainMenu className="main-menu" style={{ gridColumn: "span 1" }} />
          <PageTitle title={t('combinare')} style={{ gridColumn: "span 10" }} />

          {this.state.isLoading && <Loading style={{ gridColumn: "span 3" }} />}
          {!this.state.isLoading && (
            <AltOptions
              title={t('cerca_per')}
              options={cercaOptions}
              disabled={true}
              value={cercaPer}
              onChange={(x) => {
                this.setState({ cercaPer: x.value })
              }}
              style={{
                gridColumn: "span 3",
                pointerEvents: !controlsEnabled ? "none" : undefined,
                opacity: !controlsEnabled ? 0.4 : undefined,
              }}
            />
          )}

          {this.state.isLoading && <Loading style={{ gridColumn: "span 8" }} />}
          {!this.state.isLoading && (
            <SearchDropDown
              style={{
                gridColumn: "span 8",
                pointerEvents: currentTextID ? "none" : undefined,
              }}
              data={{ options: searchOptions }}
              changeOptions={this.changeRicerca}
              selectedOptions={this.state.ricerca}
            />
          )}
          <MoreInfo
            style={{ gridColumn: "span 1" }}
            helpSidePanelOpen={this.state.helpSidePanelOpen}
            onClicked={this.toggleHelpSidePanel}
          />
          <CompassButton
            style={{
              gridColumn: "span 1",
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
                  dettaglio: "categorie",
                })
              }
            }}
            tipologia={tipologia}
            currentTextID={currentTextID}
            setCurrentTextID={this.setCurrentTextID}
          />
        </div>

        <div className="bottom-nav navigations">
          <AltOptions
            title={t("combining:ui.numero_livelli_testo")}
            multiple
            disabled={!controlsEnabled}
            options={tipologiaOptions}
            allLink="tutti"
            style={{
              gridColumn: "span 8",
              textAlign: "center",
              pointerEvents: !controlsEnabled ? "none" : undefined,
              opacity: !controlsEnabled ? 0.4 : undefined,
            }}
            allowEmpty={false}
            value={tipologia}
            onChange={(tipologia) => {
              this.setState({ tipologia: tipologia.map((x) => x.value) })
            }}
          />

          <AltOptions
            title={t("combining:ui.dettaglio")}
            allowEmpty={false}
            disabled={!controlsEnabled}
            value={dettaglio}
            onChange={(x) => {
              this.setState({ dettaglio: x.value })
            }}
            options={dettaglioOptions}
            style={{
              gridColumn: "span 8",
              textAlign: "center",
              pointerEvents: !controlsEnabled ? "none" : undefined,
              opacity: !controlsEnabled ? 0.4 : undefined,
            }}
          />

          <AltOptions
            title={t("combining:ui.modalita")}
            allowEmpty={false}
            disabled={!controlsEnabled}
            value={aggregazione}
            onChange={(x) => {
              this.setState({ aggregazione: x.value })
            }}
            options={aggregazioneOptions}
            style={{
              gridColumn: "span 8",
              textAlign: "center",
              pointerEvents: !controlsEnabled ? "none" : undefined,
              opacity: !controlsEnabled ? 0.4 : undefined,
            }}
          />
        </div>
      </div>
    )
  }
}

export default withTranslation(["translation","combining"])(Trama)
