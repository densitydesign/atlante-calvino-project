import React from "react"

import * as d3 from "d3"
import Footer from "../../headers/Footer/Footer"

import IndexMenuHeader from "../../headers/IndexMenuHeader"
import { ReactComponent as LinkIcon } from './icons/link.svg'
import { ReactComponent as DoiIcon } from './icons/doi.svg'
import { ReactComponent as PdfIcon } from './icons/pdf.svg'

export default class Articles extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      data: [],
    }
  }

  componentDidMount() {
    console.log("press review")
    d3.tsv(process.env.PUBLIC_URL + "/pubblicazioni/pubblicazioni.tsv").then((data) => {
      this.setState({ data: data })
    })
  }

  render() {
    console.log(this.state)
    return (
      <>
        <IndexMenuHeader />
        <div className="ac-grid-24">
          <div className="content" style={{ gridColumn: "span 12" }}>
            <h1>Pubblicazioni</h1>
            <h2>Rassegna stampa</h2>
            {this.state.data
              .filter((d) => d.title)
              .map((d, i) => {
                let pdf
                if (d.pdf !== "") {
                  pdf = (
                    <>
                      <a
                        a
                        className="link"
                        href={d.pdf}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <PdfIcon className='text-dark' /> PDF
                      </a>
                    </>
                  )
                }
                let externalLinkLink
                if (d.link !== "") {
                  externalLinkLink = (
                    <>
                      <a
                        className="link"
                        href={d.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <LinkIcon className='text-dark' /> Link
                      </a>
                    </>
                  )
                }
                let pageCapture
                if (d.page_capture !== "") {
                  pageCapture = (
                    <>
                      <a
                        className="link"
                        href={d.page_capture}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Page capture
                      </a>
                    </>
                  )
                }

                let doi
                if (d.doi !== "") {
                  doi = (
                    <>
                      <a
                        className="link"
                        href={d.doi}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <DoiIcon className='text-dark' /> {d.doi}
                      </a>
                    </>
                  )
                }

                let pages
                if (d.pages !== "") {
                  pages = <>{d.pages}, </>
                }

                return (
                  <div className="pubblication-item" key={i}>
                    <small className="text-capitalize">
                      {d.kind.replace("-", " ")}
                    </small>
                    <h3 className="font-weight-bold">{d.title}</h3>
                    {d.authors && <h5>{d.authors}</h5>}
                    <p>{d.publication_place_date}</p>
                    <p className="pubblication-abstract">{d.abstract}</p>
                    <h5 className='d-flex justify-content-between'>
                      {pdf}
                      {externalLinkLink}
                      {pageCapture}
                      {doi}
                    </h5>
                  </div>
                )
              })}
          </div>
        </div>

        <Footer />
      </>
    )
  }
}
