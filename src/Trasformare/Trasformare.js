import React, { Component } from "react"
import * as d3 from "d3"
import _ from "lodash"

import GlobalData from "../utilities/GlobalData"

import MainMenu from "../general/MainMenu"
import PageTitle from "../general/PageTitle"
import MoreInfo from "../general/MoreInfo"
import CompassButton from "../general/CompassButton/CompassButton"
import HelpSidePanel from "../panels/HelpSidePanel/HelpSidePanel"
import ToggleButton from "../general/ToggleButton/ToggleButton"

import Loading from "../general/Loading"

import Options from "../general/Options"
import Search from "../general/Search"
import RangeFilter from "../general/RangeFilter"

import PlacesMatrix from "../visualizations/PlacesMatrix"
import ParseMatrixData from "../utilities/parse-matrix-data"
import TransformLegendPanel from "../panels/TransformLegendPanel/TransformLegendPanel"

class Trasformare extends Component {
  constructor(props) {
    super(props)

    this.changeCercaPer = this.changeCercaPer.bind(this)
    this.changeRicerca = this.changeRicerca.bind(this)

    this.changeGruppi = this.changeGruppi.bind(this)
    this.changePubblicazioni = this.changePubblicazioni.bind(this)
    this.changeAmbienti = this.changeAmbienti.bind(this)
    this.changeCategorie = this.changeCategorie.bind(this)

    this.resetFilter = this.resetFilter.bind(this)

    this.changeTimeSpan = this.changeTimeSpan.bind(this)

    this.downloadData = this.downloadData.bind(this)

    this.state = {
      data: "data still not loaded",
      filter: [],
      isLoading: true,
      cerca_per: {
        multiple: false,
        options: [
          {
            label: "luogo",
            status: true,
          },
          {
            label: "titolo pubblicazione",
            status: false,
          },
          {
            label: "titolo",
            status: false,
          },
        ],
      },
      gruppi: {
        multiple: false,
        options: [
          {
            label: "aperti",
            status: false,
          },
          {
            label: "chiusi",
            status: true,
          },
        ],
      },
      helpSidePanelOpen: true,
      legendOpen: false,
    }

    this.typingInSearch = false
  }

  legendToggleButtonId = "legendToggleButton"
  legendToggleButtonCaption = "LEGENDA"

  loadData() {
    d3.tsv(process.env.PUBLIC_URL + "/places-matrix-data.tsv")
      .then((data) => {
        // console.log(data)

        const graph = ParseMatrixData.parser(data)
        return graph
      })
      .then((data) => {
        let themes = data.data.map((d) => d.themes).flat()
        themes = themes.filter((d, i) => themes.indexOf(d) === i)
        themes = themes.filter((d) => d !== "" && d !== " ")
        // console.log(themes)

        let kinds = data.data.map((d) => d.publicationType).flat()
        kinds = kinds.filter((d, i) => kinds.indexOf(d) === i)
        kinds = kinds.filter((d) => d !== "" && d !== " ")
        kinds = kinds.map((d) => {
          return { label: d, status: true }
        })
        // console.log(kinds)

        let environments = data.data.map((d) => d.themes).flat()
        environments = environments.filter(
          (d, i) => environments.indexOf(d) === i
        )
        environments = environments.filter((d) => d !== "" && d !== " ")
        environments = environments.map((d) => {
          return { label: d, status: true }
        })
        // console.log(environments)

        let allTitles = data.data.map((d) => d.pubVenueTitle.split(";"))
        allTitles = allTitles.flat()
        allTitles = d3
          .nest()
          .key((d) => d)
          .entries(allTitles)
          .map((d) => d.key)

        let nodesByPublicationTitle = []
        allTitles.forEach((d) => {
          let publishedHere = data.data.filter((e) => {
            return e.pubVenueTitle.includes(d)
          })
          let obj = {
            label: d,
            id: [publishedHere.map((d) => d.id)],
            status: true,
          }
          nodesByPublicationTitle.push(obj)
        })

        let searchByCompositionTitle = d3
          .nest()
          .key((d) => d.sourceTitle)
          .entries(data.data)
          .map((d) => {
            return {
              label: d.key,
              id: d.values.map((dd) => dd.id),
              status: true,
            }
          })

        let searchByLuogo = d3
          .nest()
          .key((d) => d.label)
          .entries(data.data)
          .map((d) => {
            return {
              label: d.key,
              id: d.values.map((dd) => dd.id),
              status: true,
            }
          })
          .sort((a, b) => a.label.localeCompare(b.label))

        let data_research = {
          // luogo: data.data.map(d=>{ return { 'label':d.label, 'id': [d.id], 'status': true } }),
          luogo: searchByLuogo,
          "titolo pubblicazione": nodesByPublicationTitle,
          titolo: searchByCompositionTitle,
        }

        let time = d3.extent(data.data, (d) => d.year)
        // console.log(time)

        this.setState({
          data: data.graph,
          originalData: data.data,
          filter: data.data.map((d) => d.id),
          noFilter: data.data.map((d) => d.id),
          isLoading: false,
          data_research: data_research,
          ricerca: {
            options: data_research.luogo,
          },
          toPreserveRicerca: data.data.map((d) => d.id),
          pubblicazioni: {
            multiple: true,
            options: kinds,
          },
          ricercaOptionsSearched: [],
          toPreservePubblicazioni: data.data.map((d) => d.id),
          volumi: {
            multiple: true,
            options: GlobalData.allVolumes.map((d) => {
              return {
                ...d,
                status: true,
              }
            }),
          },
          toPreserveVolumi: data.data.map((d) => d.id),
          ambienti: {
            multiple: true,
            options: environments,
          },
          toPreserveAmbienti: data.data.map((d) => d.id),
          toPreserveCategorie: data.data.map((d) => d.id),
          timeExtent: time,
          timeFilter: time,
          update: false,
        })
      })
  }

  changeCercaPer(newOptions) {
    let selection = newOptions.filter((d) => d.status)
    if (selection.length < 1) {
      console.error("err")
      return
    }
    selection = selection[0].label
    // console.log(selection)

    let research_options = this.state.data_research[selection]

    this.setState((prevState) => ({
      cerca_per: {
        ...prevState.cerca_per,
        options: newOptions,
      },
      ricerca: {
        ...prevState.ricerca,
        options: research_options,
      },
    }))
  }

  changeGruppi(newOptions) {
    this.setState({
      statoGruppi: newOptions.filter((d) => d.status)[0].label,
    })
  }

  changeRicerca(newOptions) {
    let toPreserve = newOptions.map((d) => d.id)
    toPreserve = _.flattenDeep(toPreserve)

    // In case it is empty, to prevent bugs, make it equal to any other fitler
    if (toPreserve.length === 0) {
      toPreserve = this.state.toPreserveVolumi
    }

    this.setState((prevState) => ({
      ricerca: {
        ...prevState.ricerca,
        // options: newOptions
      },
      ricercaOptionsSearched: newOptions,
      toPreserveRicerca: toPreserve,
      filter: _.intersection(
        prevState.noFilter,
        toPreserve,
        prevState.toPreservePubblicazioni,
        prevState.toPreserveVolumi,
        prevState.toPreserveAmbienti,
        prevState.toPreserveCategorie
      ),
    }))
  }

  changePubblicazioni(newOptions) {
    const criteria = newOptions.filter((d) => d.status).map((d) => d.label)
    const toPreserve = this.state.originalData
      .filter((node) => {
        return (
          node.publicationType.filter((value) => criteria.includes(value))
            .length > 0
        )
      })
      .map((d) => d.id)

    this.setState((prevState) => ({
      pubblicazioni: {
        ...prevState.pubblicazioni,
        options: newOptions,
      },
      toPreservePubblicazioni: toPreserve,
      filter: _.intersection(
        prevState.noFilter,
        prevState.toPreserveRicerca,
        toPreserve,
        prevState.toPreserveVolumi,
        prevState.toPreserveAmbienti,
        prevState.toPreserveCategorie
      ),
    }))
  }

  changeAmbienti(newOptions) {
    const criteria = newOptions.filter((d) => d.status).map((d) => d.label)
    const toPreserve = this.state.originalData
      .filter((node) => {
        return (
          node.themes.filter((value) => criteria.includes(value)).length > 0
        )
      })
      .map((d) => d.id)

    this.setState((prevState) => ({
      ambienti: {
        ...prevState.ambienti,
        options: newOptions,
      },
      toPreserveAmbienti: toPreserve,
      filter: _.intersection(
        prevState.noFilter,
        prevState.toPreserveRicerca,
        prevState.toPreservePubblicazioni,
        prevState.toPreserveVolumi,
        toPreserve,
        prevState.toPreserveCategorie
      ),
    }))
  }

  changeCategorie(selectedCategories) {
    let toPreserve = this.state.originalData.map((d) => d.id)
    if (selectedCategories.length) {
      toPreserve = toPreserve.filter((d) =>
        selectedCategories.includes(
          this.state.originalData.find((dd) => dd.id === d).category
        )
      )
    }

    this.setState((prevState) => ({
      toPreserveCategorie: toPreserve,
      filter: _.intersection(
        prevState.noFilter,
        prevState.toPreserveRicerca,
        prevState.toPreservePubblicazioni,
        prevState.toPreserveVolumi,
        prevState.toPreserveAmbienti,
        toPreserve
      ),
    }))
  }

  resetFilter() {
    console.log(this.state)

    const ambientiOptions = this.state.ambienti.options.map((d) => {
      return {
        ...d,
        status: true,
      }
    })

    const pubblicazioniOptions = this.state.pubblicazioni.options.map((d) => {
      return {
        ...d,
        status: true,
      }
    })

    this.setState((prevState) => ({
      toPreserveRicerca: prevState.noFilter,
      ricercaOptionsSearched: [],
      toPreservePubblicazioni: prevState.noFilter,
      pubblicazioni: {
        ...prevState.pubblicazioni,
        options: pubblicazioniOptions,
      },
      toPreserveAmbienti: prevState.noFilter,
      ambienti: {
        ...prevState.ambienti,
        options: ambientiOptions,
      },
      toPreserveVolumi: prevState.noFilter,
      toPreserveCategorie: prevState.noFilter,
      filter: prevState.noFilter,
    }))
  }

  changeTimeSpan(newOptions) {
    newOptions = newOptions.map((d) => {
      return +new Date(d)
    })
    this.setState({ timeFilter: newOptions })
  }

  downloadData(event) {
    if (event.key !== "d" || this.typingInSearch) return

    const selected = d3.selectAll(".node:not(.filtered)")
    let selectedData = selected.data()

    selectedData = d3
      .nest()
      .key((d) => d.source)
      .entries(selectedData)
      .map((d) => {
        return {
          composition_id: d.key,
          composition_title: d.values[0].sourceTitle,
        }
      })

    let export_data = "Compositions titles surviving filters\n\n"

    export_data += `Ambienti attivati: ${this.state.ambienti.options
      .filter((d) => d.status)
      .map((d) => d.label)
      .join(", ")}\n`
    export_data += `Pubblicazioni attivate: ${this.state.pubblicazioni.options
      .filter((d) => d.status)
      .map((d) => d.label)
      .join(", ")}\n`
    export_data += `Ricerca effettuata: ${this.state.ricercaOptionsSearched
      .map((d) => d.label)
      .join(", ")}\n`
    export_data += `\n\n`

    export_data += `composition_id\tcomposition_title\n`
    selectedData.forEach((d) => {
      export_data += d.composition_id + "\t" + d.composition_title + "\n"
    })

    let the_date = new Date()
    the_date = d3.timeFormat("%Y_%m_%d %X")(the_date)

    download(export_data, `selection [${the_date}].txt`, "text/plain")

    // Function to download data to a file
    function download(data, filename, type) {
      console.log("download")
      var file = new Blob([data], { type: type })
      if (window.navigator.msSaveOrOpenBlob)
        // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename)
      else {
        // Others
        var a = document.createElement("a"),
          url = URL.createObjectURL(file)
        a.href = url
        a.download = filename
        document.body.appendChild(a)
        a.click()
        setTimeout(function () {
          document.body.removeChild(a)
          window.URL.revokeObjectURL(url)
        }, 0)
      }
    }
  }

  toggleHelpSidePanel = () =>
    this.setState({
      helpSidePanelOpen: !this.state.helpSidePanelOpen,
    })

  toggleButtonPressed = (buttonId) => {
    switch (buttonId) {
      case this.legendToggleButtonId:
        this.setState({ legendOpen: !this.state.legendOpen })

        break

      default:
        console.log("buttonId", buttonId)
        break
    }
  }

  componentDidMount() {
    this.loadData()
    document.addEventListener("keypress", this.downloadData)
  }

  componentWillUnmount() {
    document.removeEventListener("keypress", this.downloadData)
  }

  render() {
    // console.log("render", this.state)

    const helpPage = GlobalData.helpPages.transform.main

    return (
      <div className="trasformare main">
        <HelpSidePanel
          open={this.state.helpSidePanelOpen}
          page={helpPage}
          closeButtonClicked={this.toggleHelpSidePanel}
        />

        <div className="top-nav navigations">
          <MainMenu className="main-menu" style={{ gridColumn: "span 1" }} />
          <PageTitle
            title={"Tutti i luoghi di ambientazione all’interno dell’opera"}
            style={{ gridColumn: "span 10" }}
          />

          {this.state.isLoading && <Loading style={{ gridColumn: "span 3" }} />}
          {!this.state.isLoading && (
            <Options
              title="Cerca per"
              data={this.state.cerca_per}
              style={{ gridColumn: "span 4" }}
              changeOptions={this.changeCercaPer}
            />
          )}

          {this.state.isLoading && <Loading style={{ gridColumn: "span 8" }} />}
          {!this.state.isLoading && (
            <Search
              style={{ gridColumn: "span 7" }}
              data={this.state.ricerca}
              changeOptions={this.changeRicerca}
              onFocus={() => (this.typingInSearch = true)}
              onBlur={() => (this.typingInSearch = false)}
            />
          )}
          <MoreInfo
            style={{ gridColumn: "span 1" }}
            onClicked={this.toggleHelpSidePanel}
          />
          <CompassButton
            style={{
              gridColumn: "span 1",
            }}
          />
        </div>

        <div className="the-body-viz">
          {this.state.isLoading && <Loading />}
          {!this.state.isLoading && (
            <PlacesMatrix
              id="matrice-dei-luoghi"
              data={this.state.data}
              originalData={this.state.originalData}
              filter={this.state.filter}
              searched={this.state.toPreserveRicerca}
              timeFilter={this.state.timeFilter}
              gruppi={
                this.state.gruppi.options.filter((d) => d.status)[0].label
              }
              onChangeCategorie={this.changeCategorie}
              resetFilter={this.resetFilter}
            />
          )}
        </div>

        {this.state.legendOpen && (
          <TransformLegendPanel
            page={GlobalData.legendPages.transform.mainLegend}
          />
        )}

        <div className="bottom-nav navigations">
          {this.state.isLoading && <Loading style={{ gridColumn: "span 5" }} />}
          {!this.state.isLoading && (
            <ToggleButton
              id={this.legendToggleButtonId}
              style={{ gridColumn: "span 5" }}
              caption={this.legendToggleButtonCaption}
              pressed={this.state.legendOpen}
              callStateContainerToggleButtonPressed={this.toggleButtonPressed}
            />
          )}

          {this.state.isLoading && <Loading style={{ gridColumn: "span 5" }} />}
          {!this.state.isLoading && (
            <Options
              title="Pubblicazioni"
              data={this.state.pubblicazioni}
              style={{ gridColumn: "span 5", textAlign: "center" }}
              changeOptions={this.changePubblicazioni}
            />
          )}

          {this.state.isLoading && <Loading style={{ gridColumn: "span 5" }} />}
          {!this.state.isLoading && (
            <Options
              title="Contesti"
              data={this.state.ambienti}
              style={{ gridColumn: "span 5", textAlign: "center" }}
              changeOptions={this.changeAmbienti}
            />
          )}

          {this.state.isLoading && <Loading style={{ gridColumn: "span 9" }} />}
          {!this.state.isLoading && (
            <RangeFilter
              style={{ gridColumn: "span 9" }}
              data={this.state.timeExtent}
              changeOptions={this.changeTimeSpan}
            />
          )}
        </div>
      </div>
    )
  }
}

export default Trasformare
