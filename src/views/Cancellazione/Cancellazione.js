import React, { Component } from "react"
import styles from "./Cancellazione.module.css"

import * as d3 from "d3"
import Loading from "../../general/Loading"
import RustyViz from "../../visualizations/RustyViz"

import MainMenu from "../../general/MainMenu"
import PageTitle from "../../general/PageTitle"
// import AltOptions from "../../general/Options/AltOptions";

import MoreInfo from "../../general/MoreInfo"
import CompassButton from "../../general/CompassButton/CompassButton"
import HelpSidePanel from "../../panels/HelpSidePanel/HelpSidePanel"
import CancellazioneHelp from "../../helpPages/doubting/CancellazioneHelp"

import Options from "../../general/Options"
import SearchDropDown from "../../general/Search/SearchDropDownControlled"
import RangeFilter from "../../general/RangeFilter"

import GlobalData from "../../utilities/GlobalData"
import { withTranslation } from "react-i18next"

const filters = {
  search: [],
  time: [],
}

const manifestazioniStilistiche = {
  multiple: false,
  options: [
    {
      label: "negazione",
      value: "negazione",
      status: false,
    },
    {
      label: "esitazione",
      value: "esitazione",
      status: false,
    },
    {
      label: "riformulazione",
      value: "riformulazione",
      status: false,
    },
    {
      label: "non attivo",
      value: "non attivo",
      status: true,
    },
  ],
}

const cerca_per = {
  multiple: false,
  options: [
    {
      label: "titolo",
      value: "titolo",
      status: true,
    },
    {
      label: "pubblicazione",
      value: "pubblicazione",
      status: false,
    },
  ],
}

class Cancellazione extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,

      booksData: null,

      controlsEnabled: true,
      currentTextID: null,

      helpSidePanelOpen: true,
      manifestazioniStilistiche: manifestazioniStilistiche,
      cerca_per: cerca_per,
      searchedItems: [],
      timeExtent: [+new Date("1945"), +new Date("1985")],
      color: manifestazioniStilistiche.options.find((d) => d.status).value,
    }
  }
  async componentDidMount() {
    const data = await d3.json(
      process.env.PUBLIC_URL + "/cancellazione_dataset_spatialized.json"
    )
    const timeExtent = d3.extent(data, (d) => +new Date(d.year))

    // set publications array for search
    const gdpFiltered = GlobalData.publications.filter(
      (p) => data.map((d) => d.id).indexOf(p.id) !== -1
    )

    const publications = d3
      .nest()
      .key((d) => d.destinationTitle)
      .rollup((arr) => arr.map((d) => d.id))
      .entries(gdpFiltered)

    publications.forEach((d) => (d.label = d.key))

    this.setState({
      loading: false,
      data: data,
      searchItems: {
        titolo: data.map((d) => ({ label: d.title, value: [d.id] })).reverse(),
        pubblicazione: publications,
      },
      filter: data.map((d) => d.id),
    })
  }

  toggleHelpSidePanel = () => {
    this.setState({
      helpSidePanelOpen: !this.state.helpSidePanelOpen,
    })
  }

  changeTimeSpan = (newOptions) => {
    newOptions = newOptions.map((d) => d.getFullYear())
    filters.time = this.state.data
      .filter((d) => {
        const year = Number(d.year)
        return year >= newOptions[0] && year <= newOptions[1]
      })
      .map((d) => d.id)
    this.applyFilters()
  }

  applyFilters = () => {
    let ids = this.state.data.map((d) => d.id)
    if (filters.search.length > 0) {
      ids = ids.filter((d) => filters.search.indexOf(d) > -1)
    }
    if (filters.time.length > 0) {
      ids = ids.filter((d) => filters.time.indexOf(d) > -1)
    }
    if (ids.length === this.state.data.length) {
      ids = "no filters"
    }
    this.setState({ filter: ids })
  }

  changeColor = (newOptions) => {
    this.setState({
      color: newOptions.find((d) => d.status).value,
    })
  }

  changeCercaPer = (newOptions) => {
    this.setState((prevState) => ({
      cerca_per: {
        ...prevState.cerca_per,
        options: newOptions,
      },
    }))
  }

  /**
   *
   * @param {Array} newOptions array of objects. Each object is { label:"title of composition, collection or publication venue", value:["S001", [and other ids] ] }
   */
  changeResearch = (newOptions) => {
    const ids = d3
      .nest()
      .key((d) => d)
      .entries(newOptions.map((d) => d.value).flat())
      .map((d) => d.key)

    filters.search = ids
    this.applyFilters()
    this.setState({ searchedItems: newOptions })
  }

  onSelection = (id) => {
    console.log(id)
    // console.log(this.state.searchedItems)
    // const index=this.state.searchedItems.map(d=>d.value).flat().indexOf(id);
    // console.log(index)
    // const newSearchedItems = [...this.state.searchedItems];
    // if (index===-1){
    //   console.log('add to searched items')
    //   const obj = {
    //     'label': this.state.data.find(d=>d.id===id).title,
    //     'value': [id]
    //   }
    //   console.log(obj)
    //   console.log(this.state.searchedItems)

    //   newSearchedItems.push(obj)
    //   console.log(newSearchedItems)
    //   filters.search.push(id);
    //   this.applyFilters();
    //   this.setState({searchedItems: newSearchedItems});
    // } else {
    //   console.log('remove from searched items')
    //   newSearchedItems.splice(index,1)
    //   console.log(newSearchedItems)
    //   this.setState({searchedItems: newSearchedItems});
    // }
  }

  render() {
    const {
      helpSidePanelOpen,
    } = this.state
    return (
      <>
        <div className={styles.main}>
          <HelpSidePanel
            open={helpSidePanelOpen}
            closeButtonClicked={this.toggleHelpSidePanel}
          >
            <CancellazioneHelp />
          </HelpSidePanel>
          <div className="top-nav navigations">
            <MainMenu className="main-menu" style={{ gridColumn: "span 1" }} />
            <PageTitle
              title={this.props.t('cancellazione')}
              style={{ gridColumn: "span 9" }}
            />

            {this.state.loading && <Loading style={{ gridColumn: "span 3" }} />}
            {!this.state.loading && (
              <Options
                title={this.props.t('cerca_per')}
                data={this.state.cerca_per}
                style={{ gridColumn: "span 3" }}
                changeOptions={this.changeCercaPer}
              />
            )}

            {this.state.loading && <Loading style={{ gridColumn: "span 9" }} />}
            {!this.state.loading && (
              <SearchDropDown
                style={{ gridColumn: "span 9" }}
                data={{
                  options: this.state.searchItems[
                    this.state.cerca_per.options.find((d) => d.status).label
                  ],
                }}
                changeOptions={this.changeResearch}
                selectedOptions={this.state.searchedItems}
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
          <div className={styles.bodyViz + " the-body-viz"}>
            {this.state.loading && <Loading style={{ width: "100%" }} />}
            {!this.state.loading && (
              <RustyViz
                data={this.state.data}
                color={this.state.color}
                filter={this.state.filter}
              />
            )}
          </div>
          <div className="bottom-nav navigations">
            {this.state.loading && (
              <Loading style={{ gridColumn: "span 12" }} />
            )}
            {!this.state.loading && (
              <Options
                title={this.props.t('cancellazione:footer.colora_per_stile')}
                data={this.state.manifestazioniStilistiche}
                style={{ gridColumn: "span 12", textAlign: "center" }}
                changeOptions={this.changeColor}
              />
            )}

            {this.state.loading && (
              <Loading style={{ gridColumn: "span 12" }} />
            )}
            {!this.state.loading && (
              <RangeFilter
                style={{ gridColumn: "span 12" }}
                data={this.state.timeExtent}
                changeOptions={this.changeTimeSpan}
              />
            )}
          </div>
        </div>
      </>
    )
  }
}

export default withTranslation(['translation','cancellazione'])(Cancellazione)
