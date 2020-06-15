import React, { Component, lazy, Suspense } from 'react'
import MainMenu from '../../general/MainMenu'
import PageTitle from '../../general/PageTitle'
import MoreInfo from '../../general/MoreInfo'
import CompassButton from '../../general/CompassButton/CompassButton'
import Loading from '../../general/Loading'
import HelpSidePanel from '../../panels/HelpSidePanel/HelpSidePanel'

import GlobalData from '../../utilities/GlobalData'

import './Realismo.css'

// we leverage react lazy+suspense to load core component at first render (it will load all json by importing it)
const RealismoMain = lazy(() => import('./RealismoMain'))

const Menu = ({ title, helpPage }) => {
  return (
    <div className="trasformare main">
      <HelpSidePanel
        open={false}
        page={helpPage}
        closeButtonClicked={() => {}}
      />

      <div className="top-nav navigations">
        <MainMenu className="main-menu" style={{ gridColumn: 'span 1' }} />
        <PageTitle title={title} style={{ gridColumn: 'span 10' }} />
        <Loading style={{ gridColumn: 'span 3' }} />
        <Loading style={{ gridColumn: 'span 8' }} />
        <MoreInfo style={{ gridColumn: 'span 1' }} onClicked={() => {}} />
        <CompassButton
          style={{
            gridColumn: 'span 1',
            color: 'white',
            backgroundColor: 'black',
          }}
        />
      </div>
    </div>
  )
}

class Trama extends Component {
  render() {
    const { title } = this.props

    const helpPage = GlobalData.helpPages.plot.main

    return (
      <Suspense fallback={<Menu title={title} helpPage={helpPage} />}>
        <RealismoMain title={title}></RealismoMain>
      </Suspense>
    )
  }
}

export default Trama
