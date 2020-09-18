
import React from 'react';

import HamburgerCompassHeader from '../../headers/HamburgerCompassHeader/HamburgerCompassHeader';
import DoubtTypePerYearWrapper from '../../visualizations/DoubtTypePerYear/DoubtTypePerYearWrapper';
import ArrowButton from '../../general/ArrowButton/ArrowButton';
import SheetStyles from '../SheetStyles.module.css';

import './DoubtInformationSheet.css';

import legenda from './Scheda_Dubbio_dimensione.svg'
import zoom_01 from './infosheet-nebbia-02.svg'
import zoom_02 from './infosheet-nebbia-01.svg'


export default class DoubtInformationSheet extends React.Component
{
  render()
  {
    return (
      <>
      <HamburgerCompassHeader />
      <main className={SheetStyles.main}>
        <div className={SheetStyles.gridRow}>
        <h4 className="ac-breadcrumb">Tappa 1 - Nebbia</h4>
          <h1 className={SheetStyles.titleH1}>Analisi di occorrenze del campo semantico del dubbio</h1>
          <img className={SheetStyles.legend} style = {{gridColumn:'1 / span 9'}}  src={legenda}/>
                  <img className={SheetStyles.legend}/>
                  </div>
                  <div id="mainviz" className={SheetStyles.gridRow}>

                  <DoubtTypePerYearWrapper  />

                </div>
                    <div className={SheetStyles.gridRow}>
                <h2 className={SheetStyles.titleH2}>L'analisi</h2>
                      <p className={SheetStyles.paragraphBig}>
                      Il grafico mostra i due fenomeni, <em>nebbia e cancellazione</em>, distribuiti cronologicamente e non più ancorati ai singoli testi. Le onde della <em>bump chart</em> evidenziano il loro impiego durante i quarant’anni di carriera dell’autore, consentendoci di leggere in parallelo i loro rispettivi “andamenti”.
                      Le occorrenze inoltre sono distinte a seconda che siano state considerate <em>astratte</em> o <em>concrete</em>.
            Per <em>concreto</em> si intende una manifestazione “fisica” del fenomeno nella narrazione: es. «c’era un po’ di nebbia verso il mare e l’aria era umida» (<em>Pranzo con un pastore</em>, 1948, p. 65); «Invece si limita a farci strisciare sopra un dito e a vedere l’impronta umida come la scia d’una nave, poi a cancellarla col maglione fregandoci con il gomito» (<em>La notte dei numeri</em>, 1958, pp. 213). Per astratto si intende una manifestazione “non fisica” del fenomeno nella narrazione: es. «un’ombra bruna sale dal fondo e come nella nebbia del ricordo lascia trasparire le sparse membra dell’oca» (<em>Un chilo e mezzo di grasso d’oca</em>, 1976, p. 63); «lei abbassava le ciglia e lui si sentì come cancellato» (<em>L’avventura di uno sciatore</em>, 1959, p. 123).
            </p>
        </div>

                  <div className={SheetStyles.gridRow}>
                    <h3 className={SheetStyles.subtitleSheet}>L'inizio e la fine</h3>
                      <p className={SheetStyles.paragraph}>
                      Mettere a confronto l’inizio <span style={{color:'#0E08F9'}}>(a)</span> e la fine <span style={{color:'#0E08F9'}}>(b)</span> della carriera narrativa di Calvino permette di scoprire un dettaglio non trascurabile del modo in cui l’autore ha impiegato i due fenomeni nel corso della sua carriera. Il paragone mostra un rovesciamento dei rapporti di forza tra i due: la presenza della nebbia, più intensa nella produzione narrativa dei primi vent’anni, mano a mano diminuisce a favore della cancellazione. Eppure sono numerosi i critici ad affermare che sono proprio le opere tardive a essere frequentate maggiormente dal fenomeno atmosferico: la critica infatti ha spesso descritto i testi degli ultimi anni come immersi in un banco di nebbia.
                      La “cancellazione” è in un certo senso effetto o conseguenza della presenza della “nebbia”; a partire dagli anni Sessanta però sembra non ci sia più bisogno di integrare nel testo un elemento “fisico” in grado di giustificare la scomparsa dell’universo narrativo. La cancellazione si trasforma in una forza che trascende l’elemento naturale; l’universo narrativo si disfa senza cause apparenti sotto gli occhi del lettore.
                      Il confronto consente di verificare un altro cambiamento: il ribaltamento in entrambi i fenomeni dell’uso delle categorie concreto, dominante fra il ’44 e il ’48, e astratto, legata agli ultimi anni della produzione. Emerge la tendenza a spostarsi nel corso del tempo sempre più verso dimensioni incorporee. La nebbia di cui parlavano i critici a proposito delle opere tarde forse non era il vero e proprio elemento atmosferico, bensì una forma di comportamento del testo, un modo in cui il testo ne imita gli effetti.
                      </p>
                  <div className={SheetStyles.image} style={{gridColumn:'9 / span 5'}}>
                    <img style={{top:'var(--navigation-height)', width:'100%', position:'sticky', top:'6.4em'}} src={zoom_01}/>
                  </div>
                                    </div>



                <div className={SheetStyles.gridRow}>
                    <h3 className={SheetStyles.subtitleSheet}>Dal 1962 al 1966</h3>
                      <p className={SheetStyles.paragraph}>
          È in questi anni che, prima di cominciare a scrivere le vicende dell’entità interstellare Qwfwq, Calvino conclude il suo percorso con il personaggio Marcovaldo. Nel 1963 vengono pubblicati gli ultimi racconti della serie, fra cui La fermata sbagliata: Marcovaldo va al cinema, uscendo dopo l’ultimo spettacolo scopre che la città è stata invasa dalla nebbia; incapace di trovare dei punti di riferimento per orientarsi, scende alla fermata sbagliata del tram e si perde. L’anno successivo, nel 1964, esce su «il Caffé» un racconto cosmicomico intitolato <em>Un segno nello spazio</em>: Qwfwq si decide dopo un lungo periodo di incertezza a lasciare un segno personale nell’universo, simbolo di se stesso ma anche punto di riferimento nello spazio sconfinato a cui è confrontato; dopo appena una rivoluzione della Galassia, scopre che qualcuno lo ha cancellato e riscritto, imitando maldestramente il suo gesto; ha inizio allora una catena di cancellazioni reciproche destinata a ricoprire di tracce illeggibili l’intero universo.
          Entrambi questi testi raccontano un ostacolo visivo, ma se nel primo caso ci troviamo di fronte a una “sottrazione” subita dal personaggio, nel secondo abbiamo a che vedere con una forma di “eliminazione” volontaria che assume il ruolo di motore della creazione. Questi anni coincidono con un momento di transizione ampiamente analizzato dalla critica, in cui Calvino sembra abbandonare la dimensione terrestre per dedicarsi a quella cosmica: la pubblicazione di <em>Marcovaldo</em> ha la funzione di «chiudere definitivamente una fase della sua vita e nell’annunciarne una nuova», lasciando una volta per tutte dietro di sé «l’impegno politico degli anni cinquanta»; il racconto cosmicomico invece «è un genere letterario con il quale egli si reinventa come scrittore» (cfr. Scarpa 2005, 29, 32). Il progressivo alzarsi e abbassarsi delle diverse onde nella visualizzazione rispecchia questo cambio di rotta: si scopre infatti che l’inversione di tendenza accennata in precedenza avviene proprio nell’intervallo visualizzato. Da questo momento in poi la cancellazione avrà la meglio sulla nebbia.
          </p>
          <div className={SheetStyles.image} style={{gridColumn:'9 / span 5'}}>
            <img style={{top:'var(--navigation-height)', position:'sticky', width:'100%'}} src={zoom_02}/>

          </div>
                        </div>

              <div className={SheetStyles.gridRow}>
              <h2 className={SheetStyles.titleH2}>Bibliografia</h2>
              <ol className={SheetStyles.paragraph+' references'}>
                  <li className='referenceItem'>
                    Zwei flinke Boxer jagen die quirlige Eva und ihren Mops durch Sylt. Franz jagt im komplett verwahrlosten Taxi quer.
                  </li>
                </ol>
          </div>

          <div className={SheetStyles.gridRow}>
            <ArrowButton arrowDirection="none" textAlign="left" text="ANALISI" route="/Phenomena/territory/doubtAnalysis" />
            <ArrowButton arrowDirection="right" textAlign="left" text="TAPPA 2" route="/Process/intro" />
            <ArrowButton arrowDirection="right" textAlign="left" text="TAPPA 3" route="/Problem/intro" />
          </div>
</main>

      </>
    );
  }
}
