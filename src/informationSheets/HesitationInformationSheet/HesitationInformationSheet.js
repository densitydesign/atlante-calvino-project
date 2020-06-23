import React, { Component } from 'react';

import HamburgerCompassHeader from '../../headers/HamburgerCompassHeader/HamburgerCompassHeader';
import ArrowButton from '../../general/ArrowButton/ArrowButton';

import './HesitationInformationSheet.css';

class HesitationInformationSheet extends Component {
  render()
  {
    return (
      <>
        <HamburgerCompassHeader />
        <div>
          <main>
            <div className="viz--meta">
              <h1>LA GIORNATA DI UNO SCRUTATORE</h1>
              <h2>La giornata di uno scrutatore</h2>
              {/* <img src={process.env.PUBLIC_URL + "/informationSheets/Scheda_Spazio_Header.svg"} alt="information complement" /> */}
              [Immagine qui]
            </div>
            <div className="viz--info">
            </div>
            <article className="focus">
              <div>
                <h3>Mettiamo un titolo?</h3>
                <p>
                  Con più del 35% coinvolto, La giornata di uno scrutatore è il primo volume in cui possiamo constatare una presenza importante di testo dubitativo. Il dato non stupisce, considerando la sua natura profondamente ibrida, «una sorta di romanzo-saggio, sospeso fra testimonianza, riflessione sui fondamenti etici del vivere associato, autoritratto morale» (Barenghi 2009, 56).
                  In un’intervista del 1963 Calvino lo definì «un libro di punti interrogativi». Questo segno interpuntivo, per quanto simbolico, non è l’unico a caratterizzare il romanzo; La giornata di uno scrutatore è un libro anche di parentesi e incisi. Entrambi i segni interrompono la continuità lineare del discorso, creando visivamente degli spazi indipendenti che “spezzano” il testo principale, insinuandovi un secondo testo. Lo scopo di questo approfondimento è mostrare dove i segni grafici vengono utilizzati e soprattutto in che modo collaborano con il processo dubitativo, incrementandolo.
                </p>
                <p>
                  La giornata di uno scrutatore racconta l’esperienza di Amerigo Ormea, militante e intellettuale, nel ruolo di scrutatore che si svolge l’8 giugno 1953 presso un istituto per persone con disabilità mentali e fisiche trasformato in seggio elettorale.
                </p>
                <p>
                  È diviso in 15 capitoli e ha un totale di 214 occorrenze di testo dubitativo, distribuite in maniera diseguale all’interno del volume . Il 2° capitolo con 24 occorrenze possiede una delle concentrazioni maggiori. Verranno analizzati separatamente l’inizio e la fine del capitolo: l’obiettivo è rilevare gli argomenti legati al processo dubitativo e studiarne l’andamento.
                </p>
              </div>
              <div className="sheet--info">
                <ArrowButton arrowDirection="none" textAlign="left" text="ANALISI" route="/Phenomena/territory/spaceAnalysis" />
                <ArrowButton arrowDirection="right" textAlign="left" text="TAPPA 2" route="/Process/intro" />
                <ArrowButton arrowDirection="right" textAlign="left" text="TAPPA 3" route="/Problem/intro" />
              </div>
            </article>
          </main>
        </div>
      </>
    );
  }
}

export default HesitationInformationSheet;
