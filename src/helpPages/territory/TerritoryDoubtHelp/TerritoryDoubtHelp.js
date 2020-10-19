import React, { useState } from "react"
//import ArrowButton from "../../../general/ArrowButton/ArrowButton"
import { Tabs, Tab } from "react-bootstrap"
import { Link } from "react-router-dom"
import { ReactComponent as ApprofondimentoIcon } from "../../icons/approfondimento.svg"
import "./TerritoryDoubtHelp.css"

export default function TerritoryDoubtHelp() {
  const [key, setKey] = useState("info")
  return (
    <>
      <div className="d-flex justify-content-between">
        <strong className="text-dark-blue">
          <u>Itinerario DUBBIO</u>
        </strong>
        <div className='d-flex justify-content-between'>
          <span className='text-dark-blue mr-2'>
            <smalL>Tappa</smalL>
          </span>
          <span className='number-tappa-active mr-2'>1</span>
          <span className='number-tappa mr-2'>2</span>
          <span className='number-tappa'>3</span>
        </div>
      </div>
      <h1>Nebbia</h1>
      <div className='d-flex align-items-center'>
        <ApprofondimentoIcon />
        <strong className="ml-2">
          <Link to="/Phenomena/territory/doubtAnalysis/informationSheet">
            <u>APPROFONDIMENTO</u>
          </Link>
        </strong>
      </div>
      <Tabs
        className="mt-5"
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
      >
        <Tab tabClassName="tab-info" eventKey="info" title="Di cosa si tratta">
          <h3>Di cosa si tratta</h3>
          <p>
            Perché la nebbia? Perché è un fenomeno concreto di messa in dubbio
            dell’esistenza della realtà e di destabilizzazione della sua
            rappresentazione, che sembra tornare in varie parti dell’opera di
            Calvino. Prendendo la nebbia come oggetto di studio, abbiamo cercato
            di tracciare la ricorrenza di questo elemento atmosferico nell’opera
            di Calvino. A tal fine, sono state catalogate tutte le occorrenze
            delle parole derivate dal termine nebbia; inoltre, sono stati presi
            in considerazione anche elementi atmosferici non esattamente
            coincidenti ma simili, quali “bruma”, “caligine”, “foschia” e
            eventuali derivati. Infine, abbiamo deciso di integrare un altro
            parametro alla ricerca: sono state catalogate le occorrenze delle
            parole derivate dal termine{" "}
            <span style={{ color: "#00c19c" }}>cancellazione</span> (comprese le
            varie forme del verbo “cancellare”), che rappresenta il principale
            effetto prodotto dall’elemento atmosferico della{" "}
            <span style={{ color: "#5151fc" }}>nebbia</span>.
          </p>
          <h3>Come funziona</h3>
          <p>
            Il territorio può essere visualizzato in due diversi modi, che
            mostrano da due differenti punti di vista i dati raccolti.
          </p>
          <p>
            <em>Presenza del fenomeno</em> segnala la presenza e l’intensità dei
            due fenomeni analizzati (
            <span style={{ color: "#5151fc" }}>nebbia</span> e{" "}
            <span style={{ color: "#00c19c" }}>cancellazione</span>) in tutta
            l’opera, testo per testo. La visualizzazione consente di vedere
            separatamente l’evoluzione nel tempo dell’utilizzo di un solo
            fenomeno, unendo a questo parametro l’intensità con il quale è stato
            impiegato. Si può vedere anche la presenza e l’intensità dei due
            fenomeni riuniti (<span style={{ color: "#ff6c39" }}>entrambi</span>
            ).
          </p>
          <p>
            <em>Proporzione</em> segnala il rapporto dei due fenomeni
            all’interno di uno stesso testo: il perimetro di ogni elemento
            grafico viene colorato a seconda della proporzione quantitativa del
            fenomeno analizzato.
          </p>
        </Tab>
        <Tab tabClassName="tab-info" eventKey="legenda" title="Legenda">
          <h3>Qualche pista di lettura</h3>
          <p>
            Un’informazione rilevante che emerge dalla visualizzazione consiste
            nel diverso tipo di distribuzione nel tempo e nell’opera dei due
            fenomeni: la nebbia, maggiormente presente nelle forme brevi, si
            sposta dalle raccolte centrali nella carriera di Calvino verso i
            testi isolati degli ultimi anni. La cancellazione invece si dispone
            in maniera uniforme lungo tutta l’opera, intensificandosi
            progressivamente a partire dagli anni Sessanta. La seconda metà
            dell’opera di Calvino sembra essere pervasa dalla nebbia: se però
            osserviamo la sua evoluzione cronologica, salta all’occhio che la
            presenza numerica del fenomeno non riflette tale percezione (vedi{" "}
            <strong>Approfondimento</strong>).
          </p>
          <p>
            Un altro aspetto interessante è l’osservazione dell’impiego
            solitamente disgiunto di nebbia e cancellazione: i testi che
            contengono entrambi sono soltanto una decina. Se ne deduce che i due
            fenomeni sono complementari: laddove la nebbia ha concretamente
            spazio, il narratore non sembra aver bisogno di evocare la
            cancellazione; viceversa, laddove la cancellazione dilaga,
            l’apparizione della nebbia vera e propria diventa superflua.
          </p>
        </Tab>
      </Tabs>
    </>
  )
}
