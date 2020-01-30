
import React from 'react';

import HamburgerCompassHeader from '../../headers/HamburgerCompassHeader/HamburgerCompassHeader';
import DoubtTypePerYearWrapper from '../../visualizations/DoubtTypePerYear/DoubtTypePerYearWrapper';
import ArrowButton from '../../general/ArrowButton/ArrowButton';
import { Link } from 'react-router-dom';

import './DoubtInformationSheet.css';

export default class DoubtInformationSheet extends React.Component
{
  render()
  {
    return (
      <>
        <HamburgerCompassHeader />
        <main>
          <div className="viz--meta">
            <h1>SCHEDA DUBBIO</h1>
            <h2>Occorrenze campo semantico del dubbio</h2>
            <div className="viz--info">
              <div id="legend"><p><img src={process.env.PUBLIC_URL + "/informationSheets/Scheda_Dubbio_dimensione.svg"} width="650"/></p></div>
            </div>
          </div>
          <DoubtTypePerYearWrapper  />
          <article>
          <p>
          Il grafico mostra i due fenomeni, <em>nebbia e cancellazione</em>, distribuiti cronologicamente e non più ancorati ai singoli testi. Le onde della <em>bump chart</em> evidenziano il loro impiego durante i quarant’anni di carriera dell’autore, consentendoci di leggere in parallelo i loro rispettivi “andamenti”.
Le occorrenze inoltre sono distinte a seconda che siano state considerate <em>astratte</em> o <em>concrete</em>.
Per <em>concreto</em> si intende una manifestazione “fisica” del fenomeno nella narrazione: es. «c’era un po’ di nebbia verso il mare e l’aria era umida» (<em>Pranzo con un pastore</em>, 1948, p. 65); «Invece si limita a farci strisciare sopra un dito e a vedere l’impronta umida come la scia d’una nave, poi a cancellarla col maglione fregandoci con il gomito» (<em>La notte dei numeri</em>, 1958, pp. 213). Per astratto si intende una manifestazione “non fisica” del fenomeno nella narrazione: es. «un’ombra bruna sale dal fondo e come nella nebbia del ricordo lascia trasparire le sparse membra dell’oca» (<em>Un chilo e mezzo di grasso d’oca</em>, 1976, p. 63); «lei abbassava le ciglia e lui si sentì come cancellato» (<em>L’avventura di uno sciatore</em>, 1959, p. 123).
</p>
</article>
<article className="focus">
          <div>
          <h3>Fine e inizio, astratto e concreto</h3>
            <img src={process.env.PUBLIC_URL + "/informationSheets/nebbia-sheet-1.png"} width="300px" className="viz--pic" />
          <p>
          Mettere a confronto l’inizio e la fine della carriera narrativa di Calvino permette di scoprire un dettaglio non trascurabile del modo in cui l’autore ha impiegato i due fenomeni nel corso della sua carriera. Il paragone mostra un rovesciamento dei rapporti di forza tra i due: la presenza della nebbia, più intensa nella produzione narrativa dei primi vent’anni, mano a mano diminuisce a favore della cancellazione. Eppure sono numerosi i critici ad affermare che sono proprio le opere tardive a essere frequentate maggiormente dal fenomeno atmosferico: la critica infatti ha spesso descritto i testi degli ultimi anni come immersi in un banco di nebbia.
  La “cancellazione” è in un certo senso effetto o conseguenza della presenza della “nebbia”; a partire dagli anni Sessanta però sembra non ci sia più bisogno di integrare nel testo un elemento “fisico” in grado di giustificare la scomparsa dell’universo narrativo. La cancellazione si trasforma in una forza che trascende l’elemento naturale; l’universo narrativo si disfa senza cause apparenti sotto gli occhi del lettore.
  Il confronto consente di verificare un altro cambiamento: il ribaltamento in entrambi i fenomeni dell’uso delle categorie concreto, dominante fra il ’44 e il ’48, e astratto, legata agli ultimi anni della produzione. Emerge la tendenza a spostarsi nel corso del tempo sempre più verso dimensioni incorporee. La nebbia di cui parlavano i critici a proposito delle opere tarde forse non era il vero e proprio elemento atmosferico, bensì una forma di comportamento del testo, un modo in cui il testo ne imita gli effetti.
</p>
          </div>
</article>
<article className="focus-2">
          <div>
          <h3>1962-1966</h3>

          <p>
          È in questi anni che, prima di cominciare a scrivere le vicende dell’entità interstellare Qwfwq, Calvino conclude il suo percorso con il personaggio Marcovaldo. Nel 1963 vengono pubblicati gli ultimi racconti della serie, fra cui La fermata sbagliata: Marcovaldo va al cinema, uscendo dopo l’ultimo spettacolo scopre che la città è stata invasa dalla nebbia; incapace di trovare dei punti di riferimento per orientarsi, scende alla fermata sbagliata del tram e si perde. L’anno successivo, nel 1964, esce su «il Caffé» un racconto cosmicomico intitolato Un segno nello spazio: Qwfwq si decide dopo un lungo periodo di incertezza a lasciare un segno personale nell’universo, simbolo di se stesso ma anche punto di riferimento nello spazio sconfinato a cui è confrontato; dopo appena una rivoluzione della Galassia, scopre che qualcuno lo ha cancellato e riscritto, imitando maldestramente il suo gesto; ha inizio allora una catena di cancellazioni reciproche destinata a ricoprire di tracce illeggibili l’intero universo.</p>
          <img src={process.env.PUBLIC_URL + "/informationSheets/nebbia-sheet-1.png"} className="viz--pic" />
<p>Entrambi questi testi raccontano un ostacolo visivo, ma se nel primo caso ci troviamo di fronte a una “sottrazione” subita dal personaggio, nel secondo abbiamo a che vedere con una forma di “eliminazione” volontaria che assume il ruolo di motore della creazione. Questi anni coincidono con un momento di transizione ampiamente analizzato dalla critica, in cui Calvino sembra abbandonare la dimensione terrestre per dedicarsi a quella cosmica: la pubblicazione di Marcovaldo ha la funzione di «chiudere definitivamente una fase della sua vita e nell’annunciarne una nuova», lasciando una volta per tutte dietro di sé «l’impegno politico degli anni cinquanta»; il racconto cosmicomico invece «è un genere letterario con il quale egli si reinventa come scrittore» (cfr. Scarpa 2005, 29, 32). Il progressivo alzarsi e abbassarsi delle diverse onde nella visualizzazione rispecchia questo cambio di rotta: si scopre infatti che l’inversione di tendenza accennata in precedenza avviene proprio nell’intervallo visualizzato. Da questo momento in poi la cancellazione avrà la meglio sulla nebbia.
</p>

<div class="references">
<p>D. Scarpa, Italo Calvino, Milano, Mondadori, 2005.</p>
</div>
          </div>

          <div className="sheet--info">
            <ArrowButton arrowDirection="none" textAlign="right" text="ANALISI" route="/Phenomena/doubtAnalysis" />
            <ArrowButton arrowDirection="right" textAlign="left" text="TAPPA 2" route="/Process/intro" />
            <ArrowButton arrowDirection="right" textAlign="left" text="TAPPA 3" route="/Problem/intro" />
          </div>
</article>

</main>

      </>
    );
  }
}
