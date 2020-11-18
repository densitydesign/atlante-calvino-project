import React, { useEffect, useState } from "react"

import * as d3 from "d3"
import Footer from "../../headers/Footer/Footer"

import IndexMenuHeader from "../../headers/IndexMenuHeader"
import { ReactComponent as LinkIcon } from "./icons/link.svg"
import { ReactComponent as DoiIcon } from "./icons/doi.svg"
import { ReactComponent as PdfIcon } from "./icons/pdf.svg"
import { ReactComponent as CaptureIcon } from "./icons/capture.svg"

export default function Articles() {
  const [data, setData] = useState(null)
  const [articoliScientifici, setArticoliScientifici] = useState(true)
  const [articoliDivulgativi, setArticoliDivulgativi] = useState(true)
  const [rassegnaStampa, setRassegnaStampa] = useState(true)

  useEffect(() => {
    d3.tsv(process.env.PUBLIC_URL + "/pubblicazioni/pubblicazioni.tsv").then(
      (data) => {
        setData(data)
      }
    )
  })

  return (
    <>
      <IndexMenuHeader />
      <div className="ac-grid-24">
        <div className="content" style={{ gridColumn: "span 12" }}>
          <h1>Pubblicazioni</h1>
          <h2>Mostra</h2>
          <div className="sticky-element bg-white d-flex justify-content-between pb-4">
            <div className="d-flex align-items-center">
              <input
                type="checkbox"
                checked={articoliScientifici}
                onChange={() => setArticoliScientifici(!articoliScientifici)}
                className="mr-2"
              />{" "}
              Articoli scientifici
            </div>
            <div className="d-flex align-items-center">
              <input
                type="checkbox"
                checked={articoliDivulgativi}
                className="mr-2"
                onChange={() => setArticoliDivulgativi(!articoliDivulgativi)}
              />{" "}
              Articoli divulgativi
            </div>
            <div className="d-flex align-items-center">
              <input
                type="checkbox"
                checked={rassegnaStampa}
                onChange={() => setRassegnaStampa(!rassegnaStampa)}
                className="mr-2"
              />{" "}
              Rassegna stampa
            </div>
          </div>
          <hr />
          {data &&
            data
              .filter((d) => d.title)
              .filter(d => !rassegnaStampa ? d.kind !== 'rassegna-stampa' : d)
              .filter(d => !articoliScientifici ? d.kind !== 'articolo-scientifico' : d)
              .filter(d => !articoliDivulgativi ? d.kind !== 'articolo-divulgativo' : d)
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
                        <PdfIcon className="text-dark" /> PDF
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
                        <LinkIcon className="text-dark" /> Link
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
                        <CaptureIcon className='text-dark' /> Page capture
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
                        <DoiIcon className="text-dark" /> {d.doi}
                      </a>
                    </>
                  )
                }
                return (
                  <div className="pubblication-item" key={i}>
                    <small className="text-capitalize">
                      {d.kind.replace("-", " ")}
                    </small>
                    <h3 style={{ fontSize: 18, fontWeight: 'bold' }}>{d.title}</h3>
                    {d.authors && <h5 style={{ fontSize: 18 }}>{d.authors}</h5>}
                    <p style={{ fontSize: 18 }}>{d.publication_place_date}</p>
                    <h5 className="d-flex justify-content-between" style={{ fontSize: 14 }}>
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
