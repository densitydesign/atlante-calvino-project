import React from "react";

import * as d3 from "d3";
import Footer from "../../headers/Footer/Footer";

import IndexMenuHeader from "../../headers/IndexMenuHeader";

export default class Articles extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    console.log("press review");
    d3.tsv(process.env.PUBLIC_URL + "/pubblicazioni.tsv").then((data) => {
      this.setState({ data: data });
    });
  }

  render() {
    console.log(this.state);
    return (
      <>
        <IndexMenuHeader />
        <div className="ac-grid-24">
          <div className="content">
            <h1>Pubblicazioni</h1>
            <h2>Rassegna stampa</h2>
            {this.state.data
              .filter((d) => d.section === "Articoli")
              .map((d, i) => {
                let externalLinkLink;
                if (d.link !== "") {
                  externalLinkLink = (
                    <>
                      <a
                        className="link"
                        href={d.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Link esterno
                      </a>
                    </>
                  );
                }
                let archiveLink;
                if (d.archive !== "") {
                  archiveLink = (
                    <>
                      ,{" "}
                      <a
                        className="link"
                        href={d.archive}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Versione archiviata
                      </a>
                    </>
                  );
                }
                let download;
                if (d.download !== "") {
                  download = (
                    <>
                      ,{" "}
                      <a
                        a
                        className="link"
                        href={d.download}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        PDF
                      </a>
                    </>
                  );
                }

                let pages;
                if (d.pages !== "") {
                  pages = <>{d.pages}, </>;
                }

                return (
                  <div className="pubblication-item" key={i}>
                    <h3>{d.title}</h3>
                    <h5>
                      {d.venue}, {pages}
                      {d.date}
                    </h5>
                    <h5>{d.authors}</h5>
                    <p className="pubblication-abstract">{d.abstract}</p>
                    <h5>
                      {externalLinkLink}
                      {archiveLink}
                      {download}
                    </h5>
                  </div>
                );
              })}
          </div>
        </div>

        <Footer />
      </>
    );
  }
}
