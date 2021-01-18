import React, { Component } from "react"
import * as d3 from "d3"
import _ from "lodash"

import "./ProcessDoubting.css"

import GlobalData from "../../utilities/GlobalData"

import MainMenu from "../../general/MainMenu"
import PageTitle from "../../general/PageTitle"
import MoreInfo from "../../general/MoreInfo"
import CompassButton from "../../general/CompassButton/CompassButton"
import HelpSidePanel from "../../panels/HelpSidePanel/HelpSidePanel"
import ProcessDoubtingMainHelp from "../../helpPages/doubting/ProcessDoubtingMainHelp/ProcessDoubtingMainHelp.js"

import Loading from "../../general/Loading"
import Options from "../../general/Options"
import Search from "../../general/Search"
import SearchDropDown from "../../general/Search/SearchDropDown"
import RangeFilterSnap from "../../general/RangeFilterSnap"
import TextSearch from "../../general/TextSearch";

import DoubtingStackedBars from "../../visualizations/DoubtingStackedBars/DoubtingStackedBars"
import FoldingLine from "../../visualizations/FoldingLine/FoldingLine"
import { Trans, withTranslation } from 'react-i18next'
import { options } from "colorette"

const structureData = (arr) => {
  arr = arr.map((d, i) => {
    const obj = {
      id: "pair-" + i,
      subj_start: +d.soggetto_starts_at,
      subj_end: +d.soggetto_ends_at,
      doubt_start: +d.starts_at,
      doubt_end: +d.ends_at,
      is_alternative: d["Alternative"] !== "" ? true : false,
      formula: d.parole_formule,
      alternatives: [],
      has_children: false,
      children: [],
      parents: [],
      parent: null,
      open: false,
      level: 0,
      depth: 0,
    }
    return obj
  })

  // Handle alternatives
  // for (var i=arr.length-1; i>-1; i--) {
  //   const d = arr[i];
  //   if (d.is_alternative) {
  //     const alternative_data = {
  //       'start': +d.doubt_start,
  //       'end': +d.doubt_end
  //     }

  //     d.alternatives.push(alternative_data)
  //     d.alternatives = d.alternatives.sort((a,b)=>a.start-b.start)

  //     if (i > 1 && arr[i-1].is_alternative) {
  //       // console.log('preserve', arr[i-1].id, 'remove', d.id)
  //       arr[i-1].alternatives = d.alternatives
  //       // arr[i-1].doubt_end = +d.doubt_end
  //       // do not return the current element
  //       // its information are inside "arr[i-1]"
  //       arr.splice(i,1)
  //     } else {
  //       d.doubt_end = d.alternatives[d.alternatives.length-1].end
  //     }
  //   }
  // }

  // let counter = 0;
  const identifyParents = (d, list) => {
    // counter++;
    const listToSearchForParent = list.filter(
      (dd) => +d.id.replace("pair-", "") < +dd.id.replace("pair-", "")
    )

    let parents = listToSearchForParent.filter((dd) => {
      const subj_start_is_inside =
        (d.subj_start >= dd.subj_start && d.subj_start <= dd.subj_end) ||
        (d.subj_start >= dd.doubt_start && d.subj_start <= dd.doubt_end)
      const subj_end_is_inside =
        (d.subj_end >= dd.subj_start && d.subj_start <= dd.subj_end) ||
        (d.subj_end >= dd.doubt_start && d.subj_start <= dd.doubt_end)
      const doubt_start_is_inside =
        (d.doubt_start >= dd.doubt_start && d.doubt_start <= dd.doubt_end) ||
        (d.doubt_start >= dd.subj_start && d.doubt_start <= dd.subj_end)
      const doubt_end_is_inside =
        (d.doubt_end >= dd.doubt_start && d.doubt_start <= dd.doubt_end) ||
        (d.doubt_end >= dd.subj_start && d.doubt_start <= dd.subj_end)
      return (
        subj_start_is_inside ||
        subj_end_is_inside ||
        doubt_start_is_inside ||
        doubt_end_is_inside
      )
    })

    parents.forEach((parent) => {
      if (!parent.parent) {
        const listToSearch = list.filter(
          (dd, ii) =>
            +parent.id.replace("pair-", "") < +dd.id.replace("pair-", "")
        )
        identifyParents(parent, listToSearch)
      }
      parent.has_children = true
      if (parent.children.indexOf(d) === -1) {
        parent.children.push(d)
      }
      d.parents.push(parent)
      d.level = d3.max(d.parents, (dd) => dd.level) + 1
    })

    // if (parent) {
    //   // if(counter<1000) {
    //   if (!parent.parent) {
    //     const listToSearch = list.filter((dd,ii)=>+parent.id.replace('pair-','')<+dd.id.replace('pair-',''))
    //     // console.log('📏 list to search length', listToSearch.length);
    //     identifyParent(parent, listToSearch);
    //     // console.log(d.id, 'is level', d.level);
    //   }

    //   parent.has_children = true;
    //   if (parent.children.indexOf(d)===-1) {
    //     parent.children.push(d);
    //   }
    //   d.parent = parent;
    //   d.level = parent.level+1;
    //   // }

    // } else {
    //   // console.log(d.id, 'has no parent')
    //   // console.log(d.id, 'is level', d.level)
    // }

    return parents
  }
  // check if a pair is inside another
  arr.forEach((d, i) => {
    const child = d
    // console.log('👉', child.id)
    identifyParents(child, arr)
  })

  // set level of depth
  // 🚨 array must be reversed
  arr.reverse().forEach((element, i) => {
    // console.log('👉', element);
    if (element.children.length === 0) {
      element.depth = 0
      return
    }
    let maxChildrenLevel = 0
    retrieveMaxChildrenLevel(element)
    function retrieveMaxChildrenLevel(item) {
      if (item.children.length > 0) {
        const this_max_level = d3.max(item.children, (d) => d.level)
        maxChildrenLevel = d3.max([maxChildrenLevel, this_max_level])
        // console.log('increased maxChildrenLevel to', maxChildrenLevel);
        item.children.forEach((child) => {
          retrieveMaxChildrenLevel(child)
        })
      }
    }
    if (maxChildrenLevel > 0) {
      setDepth(element)
      function setDepth(item) {
        item.depth = Math.abs(item.level - maxChildrenLevel)
        if (item.children.length > 0) {
          item.children.forEach((child) => {
            setDepth(child)
          })
        }
      }
    }
  })

  arr.forEach((d) => {
    d.open = true
  })

  return arr.reverse()
}

class ProcessDoubting extends Component {
  constructor(props) {
    super(props)
    this.loadData = this.loadData.bind(this)
    this.changeLunghezzaTesti = this.changeLunghezzaTesti.bind(this)
    this.legendHighlight = this.legendHighlight.bind(this)

    this.changeCercaPer = this.changeCercaPer.bind(this)
    this.changeRicerca = this.changeRicerca.bind(this)
    this.changeRicerca2 = this.changeRicerca2.bind(this)
    this.changeTimeSpan = this.changeTimeSpan.bind(this)
    this.changePubblicazioni = this.changePubblicazioni.bind(this)
    this.changeAnnidamenti = this.changeAnnidamenti.bind(this)
    this.onSelectedElement = this.onSelectedElement.bind(this)

    this.applyFilters = this.applyFilters.bind(this)

    this.state = {
      // data: 'data still not loaded',
      data: [],
      isLoading: true,
      helpSidePanelOpen: true,
      stackMode: "normalized",
      lunghezzaTesti: {
        multiple: false,
        options: [
          {
            label: "assoluti",
            status: false,
          },
          {
            label: "normalizzata",
            status: true,
          },
        ],
      },
      data_research: [],
      cerca_per: {
        multiple: false,
        options: [
          {
            label: "titolo",
            status: true,
          },
          {
            label: "sede di pubblicazione",
            status: false,
          },
        ],
      },
      pubblicazioni: {
        multiple: true,
        options: [
          {
            label: "altro",
            status: true,
          },
          {
            label: "raccolta",
            status: true,
          },
          {
            label: "romanzo",
            status: true,
          },
        ],
      },
      searchedItems: [],
    }
  }

  loadData() {
    // data comes from this notebook on ObservableHQ
    // https://observablehq.com/@iosonosempreio/data-dubbio-fase-due
    d3.json(process.env.PUBLIC_URL + "/data-process-doubting.json")
      .then((json) => {
        json = json.filter(
          (d) =>{
            return d.id !== "V002" &&
            d.id !== "V004" &&
            d.id !== "V006" &&
            d.id !== "V007" &&
            d.id !== "V011" &&
            d.id !== "V012" &&
            d.id !== "V013" &&
            d.id !== "V014" &&
            d.id !== "V015" &&
            d.id !== "V017" &&
            d.id !== "V019" &&
            d.id !== "V022" &&
            d.id !== "V023" &&
            d.id !== "S088"}
        )
        const filteredData = JSON.parse(JSON.stringify(json))
        // json = json.filter(d=>d.id==="S133");
        json.forEach((d) => {
          d.details = structureData(d.details)
          const _level_doubts = [
            {
              name: "definitivo",
              children: [
                {
                  name: "0",
                  value: 0,
                },
              ],
            },
            {
              name: "dubbio",
              children: [
                {
                  name: "0",
                  value: 0,
                },
              ],
            },
          ]

          // console.log(d.details)

          // Temptative new calculation of levels_doubts
          // d.chunks.forEach(chunk=>{
          //   if (chunk.category === "definitivo") {
          //     _level_doubts[0].children[0].value += chunk.end-chunk.start;
          //   } else if (chunk.category === "dubbio") {
          //     _level_doubts[1].children[0].value += chunk.end-chunk.start;
          //   } else if (chunk.category === "soggetto") {
          //     if (!_level_doubts.find(l=>l.name==="soggetto")) {
          //       const obj = {
          //         name:"soggetto",
          //         children: []
          //       };
          //       _level_doubts.push(obj);
          //     };
          //     const _det = d.details.filter(dd=>chunk.start>=dd.subj_start && chunk.end<=dd.subj_end);
          //     const last_det = _det[_det.length-1];
          //     if (last_det) {
          //       const depth = last_det.depth.toString();

          //       const soggetto = _level_doubts.find(l=>l.name==="soggetto");
          //       if (!soggetto.children.find(l=>l.name===depth)) {
          //         soggetto.children.push({
          //           name: depth,
          //           value:0
          //         })
          //       }
          //       const annidamento = soggetto.children.find(l=>l.name===depth);
          //       annidamento.value += chunk.end-chunk.start;
          //     }

          //   } else if (chunk.category === "misto") {
          //     if (!_level_doubts.find(l=>l.name==="misto")) {
          //       const obj = {
          //         name:"misto",
          //         children: []
          //       };
          //       _level_doubts.push(obj);
          //     };
          //     const _det = d.details.filter(dd=>chunk.start>=dd.subj_start && chunk.end<=dd.subj_end);
          //     const last_det = _det[_det.length-1];
          //     if (last_det) {
          //       const depth = last_det.depth.toString();

          //       const misto = _level_doubts.find(l=>l.name==="misto");
          //       if (!misto.children.find(l=>l.name===depth)) {
          //         misto.children.push({
          //           name: depth,
          //           value:0
          //         })
          //       }
          //       const annidamento = misto.children.find(l=>l.name===depth);
          //       annidamento.value += chunk.end-chunk.start;
          //     }
          //   }
          // });

          // let total_length = 0;
          // _level_doubts.forEach(l=>{
          //   l.children.forEach(d=>{
          //     total_length+=d.value;
          //   })
          // });
          // if (d.length!==total_length) {
          //   console.warn('there is a mismatch in the calculated length of:'+d.id+'-'+d.title+'\ntext lenght='+d.length+'\ncalculated length='+total_length);
          // }
          // d.levels_doubt = _level_doubts;
        })
        return json
      })
      .then((data) => {
        data = data.sort((a, b) => +a.year - b.year)

        const lpad = function (s, width, char) {
          return s.length >= width
            ? s
            : (new Array(width).join(char) + s).slice(-width)
        }
        data.forEach((d, i) => (d.id_index = lpad(i + 1, 5, 0)))

        let publicationTitle = d3
          .nest()
          .key((d) => d.destination)
          .entries(GlobalData.publications)
          .map((d) => {
            return {
              label: (d.key = GlobalData.allVolumes.find(
                (dd) => dd.id === d.key
              )
                ? GlobalData.allVolumes.find((dd) => dd.id === d.key).label
                : d.key),
              id: d.values.map((dd) => dd.id),
              status: true,
            }
          })

        let searchByCompositionTitle = data.map((d) => {
          return {
            label: d.title,
            id: [d.id],
            value: d.id, // to be used by SearchDropDown
            status: true,
          }
        })

        let data_research = {
          titolo: searchByCompositionTitle,
          "titolo pubblicazione": publicationTitle,
        }

        // 🚨 Not best solution (PEZZA) 🚨
        const annidamenti_options = [
          { label: "0", status: false },
          { label: "1", status: false },
          { label: "2", status: false },
          { label: "3", status: false },
          { label: "4", status: false },
          { label: "5", status: false },
          { label: "6", status: false },
          { label: "7", status: false },
          { label: "8", status: false },
          { label: "9", status: false },
          { label: "10", status: false },
          // { label: "11", status: false },
          // { label: "12", status: false },
          // { label: "13", status: false },
          { label: "14", status: false },
        ]

        // need to convert date to milliseconds for the timespan filter to work
        const timeExtent = d3.extent(data, (d) => +new Date(d.year))
        this.setState({
          data: data,
          filters: {
            all: data.map((d) => d.id),
          },
          isLoading: false,
          data_research: data_research,
          ricerca: {
            options: data_research.titolo,
          },
          timeExtent: timeExtent,
          annidamenti: {
            multiple: true,
            options: annidamenti_options,
          },
        })
      })
  }

  changeLunghezzaTesti(newOptions) {
    let option
    switch (newOptions.find((d) => d.status).label) {
      case "assoluti":
        option = "absolute"
        break
      case "normalizzata":
        option = "normalized"
        break
    }
    this.setState({ stackMode: option })
  }

  componentDidMount() {
    this.loadData()

    d3.selectAll("#doubting-stacked-bars-legend .item").on(
      "click",
      function () {
        console.log(this)
      }
    )
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.filters !== this.state.filters) {
      this.applyFilters()
    }
  }

  legendHighlight(category) {
    console.log(category)
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

  changeRicerca(newOptions) {
    console.log("survive search:", newOptions)

    this.setState({ searchedItems: newOptions });

    let toPreserve = newOptions.map((d) => d.id)
    toPreserve = _.flattenDeep(toPreserve)

    // console.log(toPreserve)

    if (!toPreserve.length) {
      console.warn("Can't filter against an empty array")
      this.setState((prevState) => ({
        filters: {
          ...prevState.filters,
          ricerca: prevState.filters.all,
        },
      }))
      return
    } else {
      this.setState((prevState) => ({
        filters: {
          ...prevState.filters,
          ricerca: toPreserve,
        },
      }))
    }
  }

  changeRicerca2(newOptions) {
    // console.log("survive search (new):", newOptions)

    this.setState({ searchedItems: newOptions });

    let toPreserve = newOptions.map((d) => d.value)
    toPreserve = toPreserve.flat()
    toPreserve = _.uniq(toPreserve)

    // console.log(toPreserve)

    if (!toPreserve.length) {
      console.warn("Can't filter against an empty array")
      this.setState((prevState) => ({
        filters: {
          ...prevState.filters,
          ricerca: prevState.filters.all,
        },
      }))
      return
    } else {
      this.setState((prevState) => ({
        filters: {
          ...prevState.filters,
          ricerca: toPreserve,
        },
      }))
    }

    this.applyFilters();
  }

  changeTimeSpan(newOptions) {
    let toPreserve = this.state.data
      .filter((d) => {
        let year = +new Date(d.year)
        return year >= newOptions[0] && year <= newOptions[1]
      })
      .map((d) => d.id)

    if (!toPreserve.length) {
      console.warn("Can't filter against an empty array")
      return
    } else {
      this.setState((prevState) => ({
        filters: {
          ...prevState.filters,
          timeSpan: toPreserve,
        },
      }))
    }
  }

  changePubblicazioni(newOptions) {
    const types = newOptions.filter((d) => d.status).map((d) => d.label)
    let ids = GlobalData.publications_simple
      .filter((d) => _.intersection(d.types, types).length > 0)
      .map((d) => d.id)

    // ids = d3.nest().key(d=>d).entries(ids).map(d=>d.key);

    const toPreserve = ids
    this.setState((prevState) => ({
      filters: {
        ...prevState.filters,
        pubblicazioni: toPreserve,
      },
    }))
  }

  changeAnnidamenti(newOptions) {

    // this is to make the filtro work even thought certain levels options are not visible (11, 12 e 13)
    let isFourteen = newOptions.filter((d) => d.status).map(d=>d.label).indexOf("14")>-1;
    let optionsToUse = newOptions;
    if (isFourteen) {
      optionsToUse.push({ label: "11", status: true })
      optionsToUse.push({ label: "12", status: true })
      optionsToUse.push({ label: "13", status: true })
    }

    const levels_in_filter = optionsToUse
      .filter((d) => d.status)
      .map((d) => +d.label)

    let toPreserve = this.state.data.map((d) => d.id)

    if (levels_in_filter.length > 0) {
      toPreserve = this.state.data
        .filter((d) => {
          const levels_in_text = _.uniq(d.details.map((d) => +d.level)).sort()

          if (d.id === "ZV021") console.log(levels_in_text)

          if (levels_in_filter.length !== levels_in_text.length) {
            return false
          } else {
            return _.difference(levels_in_filter, levels_in_text).length === 0
          }
        })
        .map((d) => d.id)
    }

    // console.log(
    //   "annidamenti selezionati:",
    //   levels_in_filter.join(", "),
    //   "(" + toPreserve.length + ")",
    //   "👉",
    //   toPreserve.join(", ")
    // )

    this.setState((prevState) => ({
      filters: {
        ...prevState.filters,
        pubblicazioni: toPreserve,
      },
    }))
  }

  applyFilters() {
    // console.log("apply filters", this.state.filters);
    let survive_filters = this.state.data.map((d) => d.id)
    let id_arrays = []
    for (var f in this.state.filters) {
      survive_filters = _.intersection(survive_filters, this.state.filters[f])
    }
    // console.log(survive_filters)
    this.setState({ survive_filters: survive_filters })
  }

  onSelectedElement(element) {
    this.setState({ selectedElement: element })
  }

  toggleHelpSidePanel = () =>
    this.setState({
      helpSidePanelOpen: !this.state.helpSidePanelOpen,
    })

  render() {
    const helpPage = GlobalData.helpPages.processDoubting.main
    return (
      <div
        className="process-doubting main"
        xxxstyle={{
          backgroundImage: "url(" + process.env.PUBLIC_URL + "/___inizio.svg)",
        }}
      >
        <HelpSidePanel
          open={this.state.helpSidePanelOpen}
          // page={helpPage}
          closeButtonClicked={this.toggleHelpSidePanel}
        >
          <ProcessDoubtingMainHelp />
        </HelpSidePanel>

        <div className="top-nav navigations">
          <MainMenu className="main-menu" style={{ gridColumn: "span 1" }} />
          <PageTitle title={this.props.t('dubitare')} style={{ gridColumn: "span 9" }} />

          {this.state.loading && (
            <Loading style={{ gridColumn: "span 12" }} />
          )}
          {!this.state.loading && this.state.data && (
            <TextSearch
              style={{ gridColumn: "span 12" }}
              changeOptions={this.changeRicerca2}
              selectedOptions={this.state.searchedItems}
              availableIds={this.state.data.map(d=>d.id)}
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
          {this.state.isLoading && <Loading style={{ width: "100%" }} />}
          {!this.state.isLoading && (
            <div style={{ width: "100%", overflowX: "scroll" }}>
              <DoubtingStackedBars
                id="doubting-stacked-bars"
                data={this.state.data}
                stackMode={this.state.stackMode}
                surviveFilters={this.state.survive_filters}
                onSelectedElement={this.onSelectedElement}
              />
              {this.state.selectedElement && (
                <FoldingLine data={this.state.selectedElement} />
              )}
            </div>
          )}
        </div>

        <div className="bottom-nav navigations">
          {this.state.isLoading && <Loading style={{ gridColumn: "span 4" }} />}
          {!this.state.isLoading && (
            <Options
              title={this.props.t("doubting:Lunghezza")}
              data={this.state.lunghezzaTesti}
              style={{ gridColumn: "span 4", textAlign: "center" }}
              changeOptions={this.changeLunghezzaTesti}
            />
          )}
          {this.state.isLoading && <Loading style={{ gridColumn: "span 4" }} />}
          {!this.state.isLoading && (
            <Options
              title={this.props.t("doubting:Tipo di pubblicazione")}
              data={this.state.pubblicazioni}
              style={{ gridColumn: "span 4", textAlign: "center" }}
              changeOptions={this.changePubblicazioni}
            />
          )}
          {this.state.isLoading && <Loading style={{ gridColumn: "span 4" }} />}
          {!this.state.isLoading && (
            <Options
              isFlex={true}
              title={this.props.t("doubting:Numero di livelli")}
              data={this.state.annidamenti}
              invert={false}
              style={{ gridColumn: "span 4", textAlign: "center" }}
              changeOptions={this.changeAnnidamenti}
            />
          )}
          {this.state.isLoading && (
            <Loading style={{ gridColumn: "span 12" }} />
          )}
          {!this.state.isLoading && (
            <RangeFilterSnap
              extent={this.state.timeExtent}
              update={this.changeTimeSpan}
              style={{ gridColumn: "span 12" }}
            />
            // <RangeFilter
            //   style={{ gridColumn: "span 12" }}
            //   data={this.state.timeExtent}
            //   changeOptions={this.changeTimeSpan}
            // />
          )}
        </div>
      </div>
    )
  }
}

export default withTranslation(['translation','doubting'])(ProcessDoubting)
