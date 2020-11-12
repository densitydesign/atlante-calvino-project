import React from "react";

import HamburgerCompassHeader from "../../headers/HamburgerCompassHeader/HamburgerCompassHeader";
import DoubtTypePerYearWrapper from "../../visualizations/DoubtTypePerYear/DoubtTypePerYearWrapper";
import FooterSchede1 from "../FooterSchede1";
import SheetStyles from "../SheetStyles.module.css";

import "./DoubtInformationSheet.css";

import legenda from "./legend.svg";
import zoom_01 from "./zoom-01.svg";
import zoom_02 from "./zoom-02.svg";

export default class DoubtInformationSheet extends React.Component {
  render() {
    return (
      <>
        <HamburgerCompassHeader />
        <main className={SheetStyles.main}>
          <div className={SheetStyles.gridRow}>
            <h4 className="ac-breadcrumb">Tappa 1 > nebbia</h4>
            <h1 className={SheetStyles.titleH1}>L’effetto-nebbia</h1>
            <img
              className={SheetStyles.legend}
              style={{ gridColumn: "1 / span 12" }}
              src={legenda}
            />
          </div>
          <div id="mainviz" className={SheetStyles.gridRow}>
            <DoubtTypePerYearWrapper />
          </div>
          <div className={SheetStyles.gridRow}>
            <h2 className={SheetStyles.titleH2}>Concreto e astratto </h2>
            <p className={SheetStyles.paragraph}>
              {" "}
              Il grafico mostra i due fenomeni, <em>nebbia e cancellazione</em>,
              distribuiti cronologicamente e non più ancorati ai singoli testi.
              Le onde della <em>bump chart</em> evidenziano il loro impiego
              durante i quarant’anni di carriera dell’autore, consentendoci di
              leggere in parallelo i loro rispettivi andamenti.
              <br />
              Le occorrenze, inoltre, sono distinte a seconda che siano state
              categorizzate nella raccolta dati come <em>astratte</em> o come{" "}
              <em>concrete</em>.
              <br />
              Per concreto qui si intende una presenza fisica dell’elemento
              nella narrazione: es. «c’era un po’ di nebbia verso il mare e
              l’aria era umida» (<em>Pranzo con un pastore</em>, 1948, in{" "}
              <em>RR</em>, I, 211); «Invece si limita a farci strisciare sopra
              un dito e a vedere l’impronta umida come la scia d’una nave, poi a
              cancellarla col maglione fregandoci con il gomito» (
              <em>La notte dei numeri</em>, 1958, in <em>RR</em>, II, 1058).
              Viceversa, per <em>astratto</em> si intende una presenza “non
              fisica” dell’elemento nella narrazione: es. «un’ombra bruna sale
              dal fondo e come nella nebbia del ricordo lascia trasparire le
              sparse membra dell’oca» (<em>Un chilo e mezzo di grasso d’oca</em>
              , 1976, in <em>RR</em>, II, 930); «lei abbassava le ciglia e lui
              si sentì come cancellato» (<em>L’avventura di uno sciatore</em>,
              1959, <em>RR</em>, II, 1175).
            </p>
          </div>

          <div className={SheetStyles.gridRow}>
            <h2 className={SheetStyles.titleH2}>La nebbia che non c’è</h2>
            <p className={SheetStyles.paragraph}>
              Mettere a confronto l’inizio{" "}
              <span style={{ color: "#0E08F9" }}>(a)</span> e la fine{" "}
              <span style={{ color: "#0E08F9" }}>(b)</span> della carriera
              narrativa di Calvino permette di scoprire un dettaglio non
              trascurabile del modo in cui l’autore ha impiegato i due fenomeni
              nel corso della sua carriera. Il confronto mostra un progressivo
              rovesciamento della proporzione tra i due: la presenza della
              nebbia, più intensa nella produzione narrativa dei primi
              vent’anni, mano a mano diminuisce a favore della cancellazione.
              Nonostante l’impressione inversa che viene generalmente percepita,
              ovverosia che siano le opere tardive di Calvino a essere immerse
              nella nebbia.<br></br>
              La cancellazione rappresenta, in un certo senso, l’effetto della
              presenza della nebbia; a partire dagli anni Sessanta sembra, però,
              che non ci sia più bisogno di integrare nel testo un fenomeno
              fisico in grado di giustificare la scomparsa dell’universo
              narrativo. La cancellazione si trasforma in una forza che
              trascende il fenomeno naturale; l’universo narrativo si disfa
              sotto gli occhi del lettore senza cause apparenti.<br></br>
              Il confronto consente di verificare la tendenza dei testi
              calviniani a spostarsi nel corso del tempo verso dimensioni sempre
              più incorporee. La nebbia, che si ha l’impressione di incontrare
              nelle opere tarde di Calvino, probabilmente non è il vero e
              proprio elemento atmosferico, bensì una forma di simulazione delle
              conseguenze di quella che un tempo sarebbe stata rappresentata
              come nebbia. Un modo in cui il testo ne imita gli effetti.
            </p>

            <div className={SheetStyles.sideContent}>
              <img
                style={{
                  top: "var(--navigation-height)",
                  position: "sticky",
                  top: "6.4em",
                }}
                src={zoom_02}
              />
            </div>
          </div>

          <div className={SheetStyles.gridRow}>
            <h2 className={SheetStyles.titleH2}>Ostacoli visivi</h2>
            <p className={SheetStyles.paragraph}>
              All’inizio degli anni Sessanta, prima di dare vita al nuovo
              personaggio cosmicomico Qwfwq, Calvino porta a termine il lungo
              percorso che negli anni Cinquanta aveva riguardato il personaggio
              di Marcovaldo. Nel 1963 vengono pubblicati gli ultimi racconti
              della serie che ha per protagonista Marcovaldo, fra cui{" "}
              <em>La fermata sbagliata</em>: Marcovaldo va al cinema e uscendo
              dopo l’ultimo spettacolo scopre che la città è stata invasa dalla
              nebbia; incapace di trovare dei punti di riferimento per
              orientarsi, scende alla fermata sbagliata del tram e si perde.
              L’anno successivo, nel 1964, esce su «il Caffé» un racconto
              cosmicomico intitolato <em>Un segno nello spazio</em>: Qwfwq si
              decide dopo un lungo periodo di incertezza a lasciare un segno
              personale nell’universo, simbolo di se stesso ma anche punto di
              riferimento nello spazio sconfinato in cui si trova. Dopo appena
              una rivoluzione della Galassia, scopre che qualcuno lo ha
              cancellato e riscritto, imitando maldestramente il suo gesto; ha
              inizio allora una catena di cancellazioni reciproche destinata a
              ricoprire di tracce illeggibili l’intero universo.<br></br>
              Entrambi questi testi raccontano un ostacolo visivo, ma se nel
              primo caso ci troviamo di fronte a una “sottrazione” subita dal
              personaggio, nel secondo abbiamo a che vedere con una forma di
              “eliminazione” volontaria che assume il ruolo di motore della
              creazione. Si tratta di un chiaro momento di transizione: la
              pubblicazione di <em>Marcovaldo</em> ha la funzione di «chiudere
              definitivamente una fase della sua vita e nell’annunciarne una
              nuova», lasciando una volta per tutte dietro di sé «l’impegno
              politico degli anni cinquanta» (Scarpa 2005, 29); il racconto
              cosmicomico invece «è un genere letterario con il quale egli si
              reinventa come scrittore» (ivi, 32). Il progressivo alzarsi e
              abbassarsi delle diverse onde nella visualizzazione rispecchia
              questo cambio di rotta: si scopre, infatti, che l’inversione di
              tendenza che riguarda il passaggio dal concreto all’astratto
              avviene proprio nell’intervallo visualizzato. Da questo momento in
              poi la cancellazione avrà la meglio sulla nebbia.
            </p>

            <div className={SheetStyles.sideContent}>
              <img
                style={{ top: "var(--navigation-height)", position: "sticky" }}
                src={zoom_01}
              />
            </div>
          </div>

          <div className={SheetStyles.gridRow}>
            <h2 className={SheetStyles.titleH2}>Bibliografia</h2>
            <ol className={SheetStyles.paragraph + " references "}>
              <li className="referenceItem">
                Scarpa 2005: D. Scarpa, <em>Italo Calvino</em>, Milano,
                Mondadori.
              </li>
            </ol>
          </div>

          <FooterSchede1
            linkTappaA={"/doubt/phase2"}
            linkTappaB={"/doubt/phase3"}
            linkAnalisi={"/doubt/phase1"}
          />
        </main>
      </>
    );
  }
}
