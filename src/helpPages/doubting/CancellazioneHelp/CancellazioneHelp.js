import React, { useState } from "react"
import { Tabs, Tab } from "react-bootstrap"
import IntestazioneHelpPanel from "../../../panels/HelpSidePanel/components/IntestazioneHelpPanel"
import { ReactComponent as Legend01 } from './legenda-01.svg'
import { ReactComponent as Legend02 } from './legenda-02.svg'
import { ReactComponent as Legend03 } from './legenda-03.svg'
import { ReactComponent as Legend04 } from './legenda-04.svg'
import datum from './legend-colore.json'
import styles from "./CancellazioneHelp.module.css"

export default function CancellazioneHelp() {
  const [key, setKey] = useState("info")
  return (
    <>
      <IntestazioneHelpPanel
        tappa={3}
        linkTappa1={"/doubt/phase1"}
        linkTappa2={"/doubt/phase2"}
        linkTappa3={"/doubt/phase3"}
        titolo="Cancellazione"
        linkApprofondimento="/doubt/phase3/focus"
        nomeItinerario={"ITINERARIO DUBBIO"}
      />
      <Tabs
        className="mt-5"
        id="info-tabs"
        activeKey={key}
        onSelect={(k) => setKey(k)}
      >
        <Tab tabClassName="tab-info" eventKey="info" title="Spiegazione">
          <p className="mt-4">
            <strong>Di cosa si tratta</strong>
          </p>
          <p>
            Il testo dubitativo tende a minare la stabilità della narrazione dal
            suo interno. La visualizzazione si focalizza su questo aspetto,
            mettendo da parte la visione dei singoli racconti o romanzi a favore
            di una diversa forma di aggregazione, un elemento grafico che
            rappresenta unicamente la presenza del testo dubitativo. Con il
            vantaggio di integrare due diverse prospettive di analisi: una che
            mostra il “comportamento” del testo dubitativo nell’opera tramite la
            disposizione spaziale dei vari elementi e il loro colore; l’altra a
            cui si accede, invece, “aprendo” i singoli elementi grafici e
            svelando la loro composizione legata a una determinata griglia
            d’analisi che ci ha guidato nella creazione del database che sta
            dietro a questa visualizzazione.
          </p>
          <p>
            <strong>Come funziona</strong>
          </p>
          <p>
            La disposizione nello spazio si basa su due criteri: (1) la quantità
            di testo dubitativo in proporzione alla lunghezza totale dell’opera;
            (2) una griglia che descrive per ogni singola occorrenza cosa viene
            messo in dubbio (Categoria) e come il dubbio viene espresso (Stile).
            Le occorrenze analizzate tramite questo schema delineano un profilo
            di utilizzo del testo dubitativo: i testi con delle caratteristiche
            in comune sono collocati vicini, mentre i testi che condividono poco
            o nulla tra loro si allontanano. La griglia è composta da tre
            categorie: contenuto (si dubita del contenuto che si vuole
            raccontare), forma (si dubita del modo in cui si vuole esprimere il
            contenuto della narrazione), significato (si dubita
            dell’interpretazione del contenuto della narrazione). E da tre tipi
            di stile: esitazione (si esita sul contenuto, sulla forma o sul
            significato di quanto appena affermato), riformulazione (si
            riformula il contenuto, la forma o il significato di quanto appena
            affermato), negazione (si nega il contenuto, la forma o il
            significato di quanto appena affermato). Ogni occorrenza di testo
            dubitativo è stata analizzata attraverso il duplice focus dei
            Livelli e degli Stili. Il colore degli elementi grafici corrisponde
            alla percentuale di utilizzo delle diverse Categorie nel testo
            dubitativo di ogni singola opera. La loro dimensione corrisponde
            alla quantità in caratteri di testo dubitativo misurata in
            caratteri. Se selezionato, ogni elemento grafico si “apre”,
            mostrando la distribuzione interna delle occorrenze in base alla
            griglia con la quale il testo dubitativo è stato analizzato. La
            visualizzazione può essere esplorata tramite la ricerca per titolo
            (Cerca per) e i testi possono essere selezionati in base a un
            intervallo temporale (Filtro cronologico). Inoltre è possibile
            modificare la scala cromatica della visualizzazione, scegliendo come
            parametro uno stile (Colora per stile): questa funzione permette di
            vedere l’intensità d’utilizzo nei vari elementi grafici del tipo di
            stile selezionato.
          </p>
          <p>
            <strong>Qualche pista di lettura</strong>
          </p>
          <p>
            La linea verticale è stata introdotta all’interno della
            visualizzazione per sottolineare una particolare distribuzione degli
            elementi nello spazio. A sinistra della linea abbiamo a che fare con
            un’area cromaticamente omogenea, tendente al giallo (contenuto), in
            cui la presenza di testo dubitativo è quantitativamente inferiore; a
            destra invece la presenza di testo dubitativo si intensifica e il
            colore degli elementi grafici suggerisce una maggiore combinazione
            nell’utilizzo delle Categorie. Questa separazione, emersa
            spontaneamente dalla disposizione dei testi nello spazio in base ai
            dati raccolti, sembra rispecchiare una divisione cronologica; a
            sinistra tenderanno infatti a collocarsi i testi prima degli anni
            ’60, con qualche rara eccezione: “superano” la linea Campo di mine
            (1946), L’avventura di un soldato (1949) (vedi Approfondimento), La
            casa degli alveari (1949), L’avventura di un impiegato (1953),
            L’avventura di un fotografo (1955), Il cavaliere inesistente (1959).
            Una maggiore densità di testo dubitativo spinge questi testi verso
            destra, suggerendoci che, nonostante l’utilizzo del testo dubitativo
            si intensifichi pienamente a partire dagli anni ’60, era presente
            fin dall’inizio dell’opera.
          </p>
        </Tab>
        <Tab tabClassName="tab-info" eventKey="legenda" title="Legenda">
          <div className={styles.legendSection}>
            <h5 className={styles.legendTitle}>Dimensione</h5>
            <Legend01 />
            {/* <p>Le circonferenze rappresentano le lunghezze delle opere, mentre le 'macchie' al loro interno rappresentano la quantità di testo dubitativo.</p> */}
          </div>
          <div className={styles.legendSection}>
            <h5 className={styles.legendTitle}>Disposizione</h5>
            <Legend02 />
            <p>La vicinanza degli elementi indica una similarità in:</p>
            <ol>
              <li>
                <p>
                  Quantità di testo dubitativo in proporzione alla lunghezza
                  totale dell’opera;
                </p>
              </li>
              <li>
                <p>
                  Combinazioni delle macro-categorie e delle manifestazioni
                  stilistiche (griglia) nel testo dubitativo.
                </p>
              </li>
            </ol>
          </div>
          <div className={styles.legendSection}>
            <h5 className={styles.legendTitle}>Colore</h5>
            <Legend03 />
            <svg className={styles.colorAnimation}>
              <g transform="translate(150,50)">
                <g transform="scale(4)" className="animated-group">
                  <path
                    className="metaball"
                    fill="rgb(215, 164, 97)"
                    d="M -0.5013909475524496,3.52841759976371 C -0.7614528555331622,2.5219549332227365 -1.2441904447652543,2.4954801556932176 -1.6942942328215682,2.6117833766696767A 0.7374741613310637,0.7374741613310637, 0 0,1, -2.552005586182954, 1.596676334883019C -2.4684351839167005,1.4098158587117724 -2.528387491286892,1.233709940107677 -3.0569087303948006,0.9973371476182225A 2.0858919207695767,2.0858919207695767, 0 1,1, -1.3043576101663796, -2.788080413221046C -0.7599296360909821,-2.5273508020727915 -0.536815937568705,-2.610452516927014 -0.403712292535915,-2.8813378375388865A 1.0429459602283466,1.0429459602283466, 0 0,1, 1.2900635140340466, -3.1380457111883713C 1.4995825300597245,-2.916517847996281 1.6964617929168881,-2.9109711069260573 1.9677771816750322,-3.1675781571975445A 1.2773427161837123,1.2773427161837123, 0 1,1, 3.105581799256722, -0.9889736866124286C 2.7341042777323614,-0.9117150641853359 2.603500618954613,-0.7166216981007869 2.6872267920513044,-0.2865722595165797A 1.4749483222196427,1.4749483222196427, 0 0,1, 2.267224579522031, 1.0532035170287424C 1.9548396313582272,1.3566863289241218 1.9496207667590535,1.6237434953865573 2.2863623682353835,1.9754718137571903A 1.6490423555943647,1.6490423555943647, 0 1,1, -0.5013909475524496, 3.52841759976371 Z"
                    display="block"
                  ></path>
                  {datum.combinations.map((d, i) => {
                    return (
                      <circle
                        key={i}
                        r={d.r}
                        cx={d.x}
                        cy={d.y}
                        fill="rgb(215, 164, 97)"
                      ></circle>
                    )
                  })}
                </g>
              </g>
            </svg>
            <p>
              Colore corrispondente alla percentuale di utilizzo delle
              marco-categorie nel testo dubitativo di un’opera.
            </p>
          </div>
          <div className={styles.legendSection}>
            <h5 className={styles.legendTitle}>Composizione</h5>
            <Legend04 />
            <p>
              La mancanza di un pallino indica l'assenza della combinazione di
              macro-categoria e manifestazione stilistica.
            </p>
          </div>
        </Tab>
      </Tabs>
    </>
  )
}
