import React from "react"
import Footer from "../../headers/Footer/Footer"
import { withTranslation, Trans } from "react-i18next"
import HamburgerCloseHeader from "../../headers/HamburgerCloseHeader/HamburgerCloseHeader"
import SlidingPanel from "../../panels/SlidingPanel/SlidingPanel"
import { ReactComponent as Bussola1 } from "./icons/bussola_1.svg"
import { ReactComponent as Bussola2 } from "./icons/bussola_2.svg"
import { ReactComponent as Bussola3 } from "./icons/bussola_3.svg"
import CompassFlux from "../CompassFlux/CompassFlux"

import "./Compass.css"

class Compass extends React.Component {
  constructor(props) {
    super(props)

    this.state = { selectedPanel: 1, openFlowsOfStories: false }

    this.getSelectedPanel = this.getSelectedPanel.bind(this)
    this.setSelectedPanel = this.setSelectedPanel.bind(this)
    this.panelClicked = this.panelClicked.bind(this)
  }

  componentDidUpdate() {
    //    this.refs.fishbones.getDOMNode().focus();
  }

  getSelectedPanel() {
    return this.state.selectedPanel
  }

  setSelectedPanel(selectedPanel) {
    this.setState({ selectedPanel: selectedPanel })
  }

  panelClicked(panelId) {
    this.setState({ selectedPanel: panelId })
  }

  toggleFlowOfStories = () => {
    this.setState({ openFlowsOfStories: !this.state.openFlowsOfStories })
  }

  render() {
    return (
      <>
        <div>
          <HamburgerCloseHeader
            containerToggleCompassPanel={this.props.containerToggleCompassPanel}
          />
          <div className="compass-main-description mt-5">
            <div>
              <h1>{this.props.t("bussola")}</h1>
              <p className="text-dark-blue">
                <Trans
                  i18nKey={"testo_bussola"}
                  t={this.props.t}
                  ns="bussola"
                >
                  Prima di iniziare il viaggio, ci vuole una bussola. Per quello
                  abbiamo creato tre visualizzazioni orientative, I flussi dei
                  racconti, Il tempo e le opere e L’arcipelago dei nomi che
                  aiutino a muoversi dentro l’intero corpus dell’opera e che
                  siano sempre a portata di mano. Fornendo un colpo d’occhio
                  sulla storia dei volumi, sulla vicenda dei racconti e sulla
                  biblioteca mentale dell’autore.
                </Trans>
              </p>
            </div>
          </div>
          <div style={{ width: "70%" }}>
            <SlidingPanel
              toggleFlowOfStories={this.toggleFlowOfStories}
              id="1"
              open={this.state.selectedPanel >= 1}
              zIndex="1"
              icon={<Bussola1 className="mr-5" />}
              openClassName="panel1-open"
              closedClassName="panel1-closed"
              hide={this.props.hide}
              title={this.props.t("bussola:i_flussi_dei_racconti")}
              getSelectedPanel={this.getSelectedPanel}
              setSelectedPanel={this.setSelectedPanel}
              panelClicked={this.panelClicked}
              interactiveViewUrl="/compass/flows-of-stories"
              pdfUrl="http://atlantecalvino.unige.ch/assets/viz-02-flussi.zip"
              text={this.props.t('bussola:flussi_testo')}
            />

            <SlidingPanel
              id="2"
              open={this.state.selectedPanel >= 2}
              zIndex="2"
              icon={<Bussola2 className="mr-5" />}
              openClassName="panel2-open"
              closedClassName="panel2-closed"
              hide={this.props.hide}
              title={this.props.t('bussola:il_tempo_e_le_opere')}
              getSelectedPanel={this.getSelectedPanel}
              setSelectedPanel={this.setSelectedPanel}
              panelClicked={this.panelClicked}
              interactiveViewUrl="/compass/time-and-works"
              pdfUrl="http://atlantecalvino.unige.ch/assets/viz-01-sinuosa.zip"
              text={this.props.t('bussola:tempo_testo')}
            />

            <SlidingPanel
              id="3"
              open={this.state.selectedPanel >= 3}
              zIndex="3"
              icon={<Bussola3 className="mr-5" />}
              openClassName="panel3-open"
              closedClassName="panel3-closed"
              hide={this.props.hide}
              title={this.props.t('bussola:l_arcipelago_dei_nomi')}
              getSelectedPanel={this.getSelectedPanel}
              setSelectedPanel={this.setSelectedPanel}
              panelClicked={this.panelClicked}
              interactiveViewUrl=""
              pdfUrl="http://atlantecalvino.unige.ch/assets/viz-03-arcipelago.zip"
              text={this.props.t('bussola:testo_arcipelago')}
            />
          </div>
        </div>
        <Footer />
        {this.state.openFlowsOfStories && (
          <div className="compass-flux-modal">
            <CompassFlux toggleFlowOfStories={this.toggleFlowOfStories} />
          </div>
        )}
      </>
    )
  }
}

export default withTranslation(["translation", "bussola"])(Compass)
