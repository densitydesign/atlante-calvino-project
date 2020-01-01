
import React from 'react';

import * as d3 from 'd3';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
// <FontAwesomeIcon icon={faExternalLinkAlt} />

import HamburgerIntroHeader from '../../headers/HamburgerIntroHeader/HamburgerIntroHeader';
import Footer from '../../headers/Footer/Footer';

import '../../general/GridsWithScrollableColumns/GridWithScrollableColumn.css';
import '../../general/GridsWithScrollableColumns/ScrollableColumn.css';

export default class Articles extends React.Component
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
    console.log(this.state)
    return (
      <>
        <HamburgerIntroHeader />
        <div className="grid-with-scrollable-column">
          <div className="scrollable-column-3 col-md-12 col-lg-8">
            <h1>ARTICOLI</h1><br />
            {
              this.state.data.filter(d=>d.section==="Articoli").map((d,i)=>{
                let externalLinkLink;
                if (d.link!=='') {
                  externalLinkLink = (<><a href={d.link} target="_blank">Link esterno</a></>);
                }
                let archiveLink;
                if (d.archive!=='') {
                  archiveLink = (<>, <a href={d.archive} target="_blank">Versione archiviata</a></>);
                }
                let download;
                if (d.download!=='') {
                  download = (<>, <a href={d.download} target="_blank">PDF</a></>);
                }

                let pages;
                if (d.pages!=='') {
                  pages = (<>{d.pages}, </>);
                }

                return (
                  <div className="pubblication-item" key={i}>
                    <h3>{d.title}</h3>
                    <h5>{d.venue}, {pages}{d.date}</h5>
                    <h5>{d.authors}</h5>
                    <p className="pubblication-abstract">{d.abstract}</p>
                    <h5>{externalLinkLink}{archiveLink}{download}</h5>
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