import React, { useState } from "react";
import IndexMenuHeader from "../../headers/IndexMenuHeader";
import Footer from "../../headers/Footer/Footer";
import capta from "./capta-list";
import styles from "./capta-sections/capta.module.css";
import { BsFileEarmarkSpreadsheet } from "react-icons/bs";

export default function Capta() {
  const [selected, setSelected] = useState(capta[5]);
  return (
    <>
      <IndexMenuHeader />
      <div className="ac-grid-24 has-sidebar">
        <div className="content">
          <h1>Capta</h1>
          <h2>Data/Capta</h2>
          <p>
            In questa pagina è riportata una descrizione dei dataset che abbiamo
            costruito e che sono il fondamento delle visualizzazioni
            dell’Atlante. Spenderemo qualche parola sulle scelte progettuali,
            sui metodi e sugli strumenti che abbiamo usato per creare questo
            materiale.
            <br />
            Abbiamo deciso di intitolare questa sezione ‘Capta’ invece di
            ‘Dati’, per richiamare il concetto che ha ampiamente influenzato il
            nostro lavoro e che è ormai conosciuto nell’ambito delle Digital
            Humanities.
          </p>
          <p className="cite cite2">
            «Capta is “taken” actively while data is assumed to be a “given”
            able to be recorded and observed. From this distinction, a world of
            differences arises. Humanistic inquiry acknowledges the situated,
            partial, and constitutive character of knowledge production, the
            recognition that knowledge is constructed, taken, not simply given
            as a natural representation of pre-existing fact.»
            <br /><br />– Johanna Drucker, 2011
          </p>
          <p>
            Infatti, il lavoro di osservazione e di registrazione delle
            informazioni che sono derivate dall’opera di Calvino, ha richiesto
            di prendere delle decisioni e di fare delle scelte riguardo la
            manipolazione di questo materiale e la selezione di alcuni elementi.
            Questo processo non poteva non essere condizionato delle esperte di
            dominio che lo hanno attuato, ed in particolare dalla loro
            conoscenze ed esperienze pregresse, attraverso le quali è stato loro
            possibile creare collegamenti con altri ambiti del sapere
            umanistico.
            <br />
            Le informazioni raccolte, anche se presentate in forma di dati
            tabulari come tipicamente accade nel mondo di altre discipline più
            tecniche o scientifiche, rimangono il frutto di un lavoro
            umanistico. Per questo motivo sono state trattate visualmente con
            particolare riguardo. Sono stati riadattati modelli visivi esistenti
            oppure ne sono stati ideati di nuovi, al fine di dare spazio nella
            rappresentazione visuale alle peculiarità del pensiero umanistico,
            ed in particolare alla capacità di valorizzare eccezioni,
            particolarità e disomogeneità che sono invece difficilmente
            rappresentabili con le soluzioni tradizionali.
          </p>
          <span className={styles["info-box"]}>
            <p>
              Per meglio comprendere il testo di questa pagina è importante
              sottolineare che:
            </p>
            <ul>
              <li>l’opera è l’insieme di tutti i testi;</li>
              <li>
                il testo è il singolo racconto/volume indicato da un titolo;
              </li>
              <li>
                l’occorrenza è la parola, la formula o la frase presa in analisi
                come unità minima del dataset;
              </li>
              <li>
                la lunghezza dei testi può essere calcolata in numero di
                caratteri o in numero di parole;
              </li>
              <li>
                la posizione delle occorrenze nel testo è indicata tramite il
                numero di caratteri;
              </li>
              <li>
                posizione e lunghezza delle occorrenze possono essere
                “normalizzate” ovvero ricalcolate in percentuale rispetto al
                totale dei caratteri di riferimento.
              </li>
            </ul>
          </span>
          <p>
            Di seguito i dati, o capta, e gli strumenti che abbiamo costruito.
          </p>
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
                onClick={() => setSelected(d)}
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
                <img src={selected.license} />
              </a>
            </div>
          )}
          {selected.jsx}
        </div>
      </div>
      <div className="ac-grid-24">
        <div className="content">
          <h2>Riferimenti bibliografici</h2>
          <ol>
            <li>
              RR: Romanzi e racconti, edizione diretta da Claudio Milanini, a
              cura di Mario Barenghi e Bruno Falcetto, MIlano, Mondadori, 1991,
              1992, 1994, 3 voll.
            </li>
            <li>
              SS: Saggi. 1945-1985, a cura di Mario Barenghi, Milano, Mondadori,
              1995, 2 voll.
            </li>
            <li>
              AC: Album Calvino, a cura di Luca Baranelli ed Ernesto Ferrero,
              Milano, Mondadori 1995.
            </li>
            <li>
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
