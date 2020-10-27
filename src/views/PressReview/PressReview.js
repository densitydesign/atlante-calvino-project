
import React from 'react';

import * as d3 from 'd3';

import HamburgerIntroHeader from '../../headers/HamburgerIntroHeader/HamburgerIntroHeader';
import Footer from '../../headers/Footer/Footer';

import '../../general/GridsWithScrollableColumns/GridWithScrollableColumn.css';
import '../../general/GridsWithScrollableColumns/ScrollableColumn.css';

export default class PressReview extends React.Component
{
  constructor(props){
    super(props);

    this.state = {
      data: []
    }
  }

  componentDidMount() {
    console.log('press review')
    d3.tsv('https://docs.google.com/spreadsheets/d/e/2PACX-1vQTLGjZLV0-w_72af5IdeY9kNUA6FTqjWdGfR1LGfLz5ix5CusACEWo0jB77hHdKRM2hPegDYawAoXo/pub?output=tsv').then(data => {
      this.setState({data: data})
    })
  }

  render()
  {
    return (
      <>
        <HamburgerIntroHeader />
        <div className="grid-with-scrollable-column">
          <div className="scrollable-column-3 col-md-12 col-lg-8">
            <h1>RASSEGNA STAMPA</h1>
            {
              this.state.data.filter(d=>d.section==="Rassegna").map((d,i)=>{
                let externalLink;
                if (d.link!=='') {
                  externalLink = (<><a className="link" href={d.link} target="_blank" rel="noopener noreferrer">Link esterno</a></>);
                }
                let archiveLink;
                if (d.archive!=='') {
                  archiveLink = (<>, <a href={d.archive} className="link" target="_blank" rel="noopener noreferrer">Versione archiviata</a></>);
                }
                let download;
                if (d.download!=='') {
                  download = (<>, <a href={d.download} className="link" target="_blank" rel="noopener noreferrer">PDF</a></>);
                }
                return (
                  <div className="pubblication-item" key={i}>
                    <h3>{d.title}</h3>
                    <p>{d.venue}, {d.date}, {d.pages}</p>
                    <h5>{externalLink}{archiveLink}{download}</h5>
                  </div>
                )
              })
            }

          </div>
        </div>
        <Footer />
      </>
    );
  }
}

//<PressItem href="www.corriere.it" linkText="Calvino sul Corriere" note="Corriere della Sera, 10 settembre 2010" />
