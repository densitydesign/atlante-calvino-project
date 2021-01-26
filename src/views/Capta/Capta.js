import React, { useState } from "react";
import IndexMenuHeader from "../../headers/IndexMenuHeader";
import Footer from "../../headers/Footer/Footer";
import capta from "./capta-list";
import styles from "./capta-sections/capta.module.css";
import { BsFileEarmarkSpreadsheet, BsBoxArrowUpRight } from "react-icons/bs";
import { Trans, useTranslation } from "react-i18next";

export default function Capta() {
  const [selected, setSelected] = useState(capta[0]);
  const { t } = useTranslation("capta");
  return (
    <>
      <IndexMenuHeader />
      <div className="ac-grid-24 has-sidebar">
        <div className="content">
          <h1>{t("Capta")}</h1>
          <h2>{t("Data/Capta")}</h2>
          <Trans t={t} i18nKey={"paragrafo_capta_1"} ns="capta">
            <p>
              I dataset che abbiamo realizzato sono il fondamento delle
              visualizzazioni dell’Atlante. In questa sezione se ne fornisce una
              descrizione, insieme ad alcune informazioni sulle scelte
              progettuali, sui metodi e sugli strumenti usati.
              <br />
              Abbiamo deciso di intitolare questa sezione <i>Capta</i> invece di{" "}
              <i>Dati</i>, per sottolineare un concetto che ha fortemente
              influenzato il nostro lavoro e che è molto noto nell’ambito delle
              Digital Humanities, secondo la definizione di Johanna Drucker:
            </p>
            <p className="cite cite2">
              <i>Capta</i> is “taken” actively while <i>data</i> is assumed to
              be a “given” able to be recorded and observed. From this
              distinction, a world of differences arises. Humanistic inquiry
              acknowledges the situated, partial, and constitutive character of
              knowledge production, the recognition that knowledge is
              constructed, taken, not simply given as a natural representation
              of pre-existing fact. (
              <a
                href="http://www.digitalhumanities.org/dhq/vol/5/1/000091/000091.html"
                target="_blank"
                rel="noopener"
              >
                Drucker, 2011
              </a>
              )
            </p>
            <p>
              Quando si vuole rappresentare visivamente un fenomeno, è
              inevitabile un passaggio in cui lo si traduce in numeri e tabelle:
              come ogni processo di traduzione, è un lavoro fatto di scelte e
              selezioni. Nel caso delle analisi presentate in questo Atlante,
              che sono il frutto di una ricerca umanistica, il legame con i
              processi di lettura e interpretazione, piuttosto che con la pura e
              semplice applicazione di algoritmi statistici, risulta ancora più
              evidente. Al fine di dare spazio alle peculiarità dello sguardo
              umanistico, è stato adottato un processo di design iterativo, in
              cui le strutture del dataset e le loro traduzioni visive si sono
              modificate con l’evolvere dell’analisi.
            </p>

            <p>
              In questo processo sono stati riadattati modelli visivi esistenti
              e ne sono stati ideati di nuovi, in modo da valorizzare eccezioni,
              disomogeneità e collegamenti con altri ambiti del sapere
              umanistico che sono difficilmente rappresentabili con soluzioni
              tradizionali.
            </p>

            <p>
              Di seguito sono presentati i risultati di questo processo: i
              dataset, che per le autrici e gli autori di questo progetto sono
              concettualmente dei <i>capta</i>, e gli strumenti che ne hanno
              permesso la realizzazione.
            </p>
          </Trans>
          <Trans t={t} i18nKey={"paragrafo_capta_2"} ns="capta">
            <span className={[styles["info-box"], styles[t("lang")]].join(" ")}>
              <p>
                Per un’agile comprensione del testo di questa pagina, è
                importante sottolineare che:
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
                  l’<i>occorrenza</i> è la parola o il passaggio presi in
                  analisi come unità minima del dataset;
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
                  la posizione e lunghezza delle occorrenze possono essere
                  “normalizzate” ovvero ricalcolate in percentuale rispetto al
                  totale dei caratteri di riferimento.
                </li>
              </ul>
            </span>
          </Trans>
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
                {t(d.name.replace(":", "-"))}
              </li>
            ))}
          </ul>
        </div>
        <div className={styles["capta-focus"]}>
          <h1>{t(selected.name.replace(":", "-"))}</h1>
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
                      : t("dataset non ancora disponibile")}
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
          <Trans
            i18nKey={selected.name.replace(":", "-") + "-text"}
            t={t}
            ns="capta"
          >
            {selected.jsx}
          </Trans>
        </div>
      </div>
      <Footer />
    </>
  );
}
