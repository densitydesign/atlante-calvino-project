import React, { useState } from "react";
import IndexMenuHeader from "../../headers/IndexMenuHeader";
import Footer from "../../headers/Footer/Footer";
import capta from "./capta-list";
import styles from "./capta-sections/capta.module.css";
import { BsFileEarmarkSpreadsheet, BsBoxArrowUpRight } from "react-icons/bs";

export default function Capta() {
  const [selected, setSelected] = useState(capta[0]);
  return (
    <>
      <IndexMenuHeader />
      <div className="ac-grid-24 has-sidebar">
        <div className="content">
          <h1>Capta</h1>
          <h2>Data/Capta</h2>
          <p>
            I dataset che abbiamo realizzato sono il fondamento delle
            visualizzazioni dell’Atlante. In questa sezione se ne fornisce una
            descrizione, insieme ad alcune informazioni sulle scelte
            progettuali, sui metodi e sugli strumenti usati.
            <br />
            Abbiamo deciso di intitolare questa sezione <i>Capta</i> invece di{" "}
            <i>Dati</i>, per servirci di un concetto che ha fortemente
            influenzato il nostro lavoro e che è molto noto nell’ambito delle
            Digital Humanities, secondo la definizione di Johanna Drucker:
          </p>
          <p className="cite cite2">
            «Capta is “taken” actively while data is assumed to be a “given”
            able to be recorded and observed. From this distinction, a world of
            differences arises. Humanistic inquiry acknowledges the situated,
            partial, and constitutive character of knowledge production, the
            recognition that knowledge is constructed, taken, not simply given
            as a natural representation of pre-existing fact.» (<a href="http://www.digitalhumanities.org/dhq/vol/5/1/000091/000091.html" target="_blank" rel="noopener">Drucker, 2011</a>)
          </p>
          <p>
            Le informazioni raccolte, anche se presentate in forma di dati
            tabulari come tipicamente accade nel campo delle discipline tecniche
            o scientifiche, rimangono il frutto di un lavoro umanistico: per
            questo motivo sono state trattate visualmente con particolare
            riguardo. Sono stati riadattati modelli visivi esistenti oppure ne
            sono stati ideati di nuovi, al fine di dare spazio nella
            rappresentazione alle peculiarità dello sguardo umanistico: alla sua
            capacità di valorizzare eccezioni, particolarità e disomogeneità
            difficilmente rappresentabili con le soluzioni tradizionali e di
            “vedere” elementi testuali che al momento nessuna macchina può
            riconoscere.
          </p>
          <p>
            Di seguito sono elencati i capta e gli strumenti che ne hanno
            permesso la raccolta.
          </p>
          <span className={styles["info-box"]}>
            <p>
              Per meglio comprendere il testo di questa pagina è importante
              sottolineare che:
            </p>
            <ul>
              <li>
                l’<i>opera</i> è l’insieme di tutti i testi;
              </li>
              <li>
                il <i>testo</i> è il singolo racconto/volume indicato da un{" "}
                <i>titolo</i>;
              </li>
              <li>
                l’<i>occorrenza</i> è la parola o il passaggio presi in analisi
                come unità minime del dataset;
              </li>
              <li>
                la lunghezza dei testi può essere calcolata in numero di{" "}
                <i>caratteri</i> o in numero di <i>parole</i>;
              </li>
              <li>
                la posizione delle <i>occorrenze</i> nel testo è indicata
                tramite il numero di caratteri;
              </li>
              <li>
                Posizione e lunghezza delle occorrenze possono essere
                “normalizzate” ovvero ricalcolate in percentuale rispetto al
                totale dei caratteri di riferimento.
              </li>
            </ul>
          </span>
        </div>
      </div>
      <div
        className="ac-grid-24"
        style={{
          borderTop: "1px solid black",
          borderBottom: "1px solid black",
        }}
      >
        <div className={[styles["capta-list"]].join(" ")}>
          <ul className="sticky-element">
            {capta.map((d) => (
              <li
                key={d.name}
                onClick={() => {
                  document
                    .querySelector("." + styles["capta-focus"])
                    .scrollIntoView({ behavior: "auto", block: "start" });
                  setSelected(d);
                }}
                className={d === selected ? styles["active-capta"] : ""}
              >
                {d.name}
              </li>
            ))}
          </ul>
        </div>
        <div className={styles["capta-focus"]}>
          <h1>{selected.name}</h1>
          {selected.type === "data" && (
            <div className={styles.downloadArea}>
              {selected.files.map((file) => {
                return (
                  <a
                    key={file.label}
                    href={file.file}
                    className={[
                      styles["dataset-download"],
                      "noselect",
                      selected.open ? "" : `disabled ${styles.disabled}`,
                    ].join(" ")}
                    download={file.label}
                  >
                    <BsFileEarmarkSpreadsheet
                      style={{ marginRight: "0.5rem" }}
                    />
                    {selected.open
                      ? file.label.replace("[Atlante Calvino] ", "")
                      : "dataset non ancora disponibile"}
                  </a>
                );
              })}
              <a
                href={selected.licenseUrl}
                className={[styles["dataset-license"]].join(" ")}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={selected.license} alt={selected.licenseAltAttr} />
              </a>
            </div>
          )}
          {selected.type === "tool" && (
            <div className={styles.downloadArea}>
              {selected.urls.map((url) => {
                return (
                  <a
                    key={url.label}
                    href={url.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={[styles["dataset-download"], "noselect"].join(
                      " "
                    )}
                  >
                    {url.label}
                    <BsBoxArrowUpRight style={{ marginLeft: "0.5rem" }} />
                  </a>
                );
              })}
            </div>
          )}
          {selected.jsx}
        </div>
      </div>
      <div className="ac-grid-24">
        <div className="content">
          <h2>Bibliografia</h2>
          <ol className="references">
            <li className="referenceItem">
              Drucker, Johanna. ‘Humanities Approaches to Graphical Display’.
              Digital Humanities Quarterly 5, no. 1 (2011): 1–23.{" "}
              <a
                href="http://www.digitalhumanities.org/dhq/vol/5/1/000091/000091.html"
                target="_blank"
                rel="noopener noreferrer"
              >
                Link
              </a>
            </li>
            <li className="referenceItem">
              RR: Romanzi e racconti, edizione diretta da Claudio Milanini, a
              cura di Mario Barenghi e Bruno Falcetto, MIlano, Mondadori, 1991,
              1992, 1994, 3 voll.
            </li>
            <li className="referenceItem">
              SS: Saggi. 1945-1985, a cura di Mario Barenghi, Milano, Mondadori,
              1995, 2 voll.
            </li>
            <li className="referenceItem">
              AC: Album Calvino, a cura di Luca Baranelli ed Ernesto Ferrero,
              Milano, Mondadori 1995.
            </li>
            <li className="referenceItem">
              Lettere: Lettere. 1940-1985, a cura di Luca Baranelli.
              Introduzione di Claudio Milanini, Cronologia a cura di Mario
              Barenghi e Bruno Falcetto, Avvertenza di Luca Baranelli, Milano,
              Mondadori, 2000.
            </li>
          </ol>
        </div>
      </div>
      <Footer />
    </>
  );
}
