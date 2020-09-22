
import React from 'react';

import HamburgerCompassHeader from '../../headers/HamburgerCompassHeader/HamburgerCompassHeader';
import ArrowButton from '../../general/ArrowButton/ArrowButton';
import SheetStyles from '../SheetStyles.module.css';

import './SpaceInformationSheet.css';

import inventati from './infosheet-spazio.svg'
import legenda from './infosheet-spazio-legenda.svg'
import zoom_01 from './zoom_01.svg'
import zoom_02 from './zoom_02.svg'
import zoom_03 from './zoom_03.svg'
import zoom_04 from './zoom_04.svg'


export default class SpaceInformationSheet extends React.Component
{
  render()
  {
    return (
      <>
      <HamburgerCompassHeader />
      <main className={SheetStyles.main}>
        <div className={SheetStyles.gridRow}>
          <h4 className="ac-breadcrumb">Tappa 1 - Nebbia</h4>
          <h1 className={SheetStyles.titleH1}>Tassonomia dei luoghi inventati</h1>
          <img className={SheetStyles.legend} style = {{gridColumn:'1 / span 5'}}  src={legenda}/>
          <img className = {SheetStyles.image100w} style={{gridColumn:'1 / span 12'}} src={inventati}/>
              <h2 className={SheetStyles.titleH2}>L'analisi</h2>
                <div className={SheetStyles.paragraphBig}>
                    <p>La categoria dei <span style={{color:'#00C19C'}}>luoghi inventati</span> riprende una delle quattro categorie ideate da
                    Frank Zipfel nel 2001 e poi concettualizzate da Barbara Piatti nel 2008, sulla base del grado di dipendenza
                    dei luoghi finzionali da quelli geospaziali<sup> 1</sup>. Per Barbara Piatti gli <em>invented places</em> sono tutti i luoghi inventati
                    creati all’interno di realtà geograficamente familiari<sup> 2</sup>.
                    A testimonianza di come l’invenzione sia «una vena naturale»<sup> 3</sup> di Calvino,
                    dall’inizio alla fine della sua vita, le ambientazioni inventate del corpus si distribuiscono in modo omogeneo nel corso del tempo:
                    il primo luogo compare nel 1948, ed è il paesino di <em>Sant’Alcide</em> <strong>(1)</strong> in cui è ambientato il racconto <em>Isabella e Fioravanti</em>;
                    l’ultimo, nel 1982, è <em>Casa Palomar</em> <strong>(2)</strong>, la dimora cittadina del protagonista dell’ultima raccolta dell’autore. Osservando la visualizzazione,
                    si nota anche come questa distribuzione riguardi tutte le tipologie di opere: i romanzi, i racconti confluiti in raccolta e i testi pubblicati
                    su periodici e poi rimasti inediti. Prendendo singolarmente in esame le tre differenti sezioni si evidenziano tuttavia caratteristiche intrinseche
                    molto diverse. Vediamo quali.
                </p>
                </div>
                <div className={SheetStyles.paragraph}>
                <h3 className={SheetStyles.subtitleSheet}>I romanzi</h3>
                    <p>La prima sezione, quella dei romanzi, è senza dubbio quella in cui si registra la maggior concentrazione di luoghi inventati,
                    con più della metà delle opere (5 su 9) che presentano almeno un’ambientazione di questo tipo.
                    È noto che la vena immaginifica di Calvino si sviluppi maggiormente nelle opere più estese del corpus, anche in virtù del complesso
                    rapporto dell’autore con il romanzo novecentesco tradizionale<sup> 4</sup>. Si pensi alle storie della <em>Trilogia degli antenati</em>, ambientate tra gli
                    alberi di Ombrosa e i boschi di Terralba. Oppure alle città visionarie e simboliche esplorate da Marco Polo nelle Città invisibili, o ancora,
                    ai luoghi dai nomi impronunciabili – Petkwo, Kudgiwa, Oquedal – in cui si muovono i personaggi di <em>Se una notte d’inverno un viaggiatore</em>.
                    Il modo in cui queste ambientazioni fantastiche si inseriscono nel tessuto narrativo delle storie merita tuttavia uno sguardo più attento.
                    Le visualizzazioni nel secondo e del terzo livello di analisi mostrano come in molti casi i luoghi d’invenzione intrattengano uno stretto
                    dialogo con quelli reali e riconoscibili. Pensiamo, ad esempio, al <em>Visconte dimezzato</em>, primo capitolo della Trilogia. Il racconto si apre
                    in Boemia, durante la guerra cristiana contro i Turchi, ma la storia principale si sviluppa a Terralba, terra natale del visconte Medardo,
                    il quale, colpito da una palla di cannone ma miracolosamente salvo per metà, fa ritorno a casa. Terralba si trova in Italia e appartiene alla
                    Repubblica di Genova: è dunque all’interno di uno spazio reale e definito che hanno luogo le avventure fantastiche del protagonista.
                </p>
                </div>
                <div className={SheetStyles.sideContent}>
                    <img className={SheetStyles.image} style={{position:'sticky',top:'calc(var(--navigation-height)+4em)'}} src={zoom_03}/>
                </div>

                    <div className={SheetStyles.paragraph}>
                      <p>In apparenza questo non accade nel <em>Barone rampante</em>, ambientato nel libero comune di Ombrosa, territorio - mondo del baronetto Cosimo Piovasco di Rondò.
                      Tuttavia, pur senza essere esplicitamente incorniciata all’ interno di un luogo localizzabile, anche Ombrosa è in qualche modo legata alla Repubblica di Genova,
                      di cui è comune tributario.Pertanto, seppur in modo meno evidente.anche nel caso del Barone rampante lo spazio fantastico si intreccia a quello storico.
                      Il fatto poi che Terralba e Ombrosa siano in qualche modo riconducibili alla Liguria, terra natale di Calvino, è doppiamente significativo.
                      Nel 1965, è lo stesso scrittore, con lo pseudonimo - anagramma di Tonio Cavilla, a sottolineare l’ importanza del paesaggio ligure sullo sfondo:</p>
                    <p className={' cite '}>
                    "C’è, quasi nascosto dentro il libro, un altro libro più sommesso, di nostalgica evocazione d’ un paesaggio, o meglio: di ri - invenzione d’ un paesaggio attraverso la composizione, l’ ingrandimento, la moltiplicazione di sparsi elementi di memoria. [...] Il romanzo si svolge in un paese immaginario, Ombrosa, ma ci rendiamo presto conto che questa ombrosa si trova in un punto imprecisato della Riviera ligure.Dai dati biografici dell’ Autore sappiamo che egli è di San Remo, che nella cittadina ligure ha passato infanzia e giovinezza fino all’ immediato dopoguerra;
                    da altri scritti dell’ Autore il suo legame col paese risulta nutrito di memorie più antiche[...].
                    </p>
                  </div>

              <div className={SheetStyles.sideContent}>
                  <img className={SheetStyles.image} style={{position:'sticky', top:'calc(var(--navigation-height)+4em)'}} src={zoom_01}/>
              </div>

                  <div className={SheetStyles.paragraph}>
                    <p>Evocare il paesaggio ligure, che per Calvino è il paesaggio per eccellenza, assume allora una precisa finalità:</p>
                      <p className={' cite '}>
                      "Ma tutto questo paesaggio geografico e ideale appartiene al passato: sappiamo che la Riviera in questo dopoguerra è diventata irriconoscibile per il modo caotico in cui si è riempita di caseggiati urbani fino a trasformarsi in una distesa di cemento;
                      sappiamo che le speculazioni economiche e un facile edonismo dominano i rapporti umani di una larga parte della nostra società.Ed è solo da tutti questi elementi sommati insieme che possiamo ricavare la radice lirica del libro, la prima spinta dell’ invenzione poetica.Partendo da un mondo che non esiste più, l’ Autore regredisce a un mondo mai esistito che contenga i nuclei di ciò che è stato e di ciò che avrebbe potuto essere, le allegorie del passato e del presente, le interrogazioni sulla propria esperienza."
                      </p>
                      <p className={SheetStyles.paragraph}>
                      Un discorso diverso, ma non così distante, può essere fatto per le Città invisibili,
                      l’opera che raccoglie il maggior numero di ambientazioni fantastiche.
                      Le varie Eufemia, Zora, Despina sembrano così rarefatte che è facile credere di trovarsi infine fuori
                      dal tempo e dallo spazio. Invece, anche in questo caso, Calvino non rinuncia a una cornice storica,
                      poiché tutte e cinquantacinque le città visitate da Marco Polo appartengono allo sterminato impero di Kublai Khan.</p>
                  </div>

                  <div className={SheetStyles.sideContent} style={{position:'sticky'}}>
                  <img className={SheetStyles.image} style={{position:'sticky', top:'calc(var(--navigation-height))'}} src={zoom_02}/>
                      </div>
                  </div>

            <div className={SheetStyles.gridRow}>
              <h3 className={SheetStyles.subtitleSheet}>I racconti</h3>
                        <img className={SheetStyles.image} style={{gridColumn:'1 / span 7'}} src={zoom_04}/>
                        <p className='captionLeft' style={{gridColumn:'1 / span 7'}} >Una selezione di racconti scritti a metà degli anni Cinquanta</p>
                    <p className={SheetStyles.paragraphBig}>
                    Nella forma breve, sia che si tratti di racconti pubblicati in volumi sia che si tratti di testi scritti per i periodici e poi rimasti inediti,
                    la diffusione di luoghi inventati è decisamente inferiore.
                    Tuttavia, come mostra la visualizzazione, ci sono alcune interessanti zone di concentrazione,
                    una in particolare più rilevante delle altre.
                    Tra la fine del 1953 e l’inizio del 1954, dopo aver pubblicato sull’«Unità» di Torino il primo blocco di storie che andranno a comporre Marcovaldo, Calvino scrive una serie di testi brevi di natura molto diversa, accomunati dall’incedere favolistico e dalla presenza di ambientazioni fantastiche. Due di questi compaiono ancora sull’edizione torinese dell’«Unità»; gli altri tre, scritti l’anno successivo, sono pubblicati sul settimanale «Il Contemporaneo» in una rubrica intitolata I viaggi di Gulliver all’interno della quale Calvino raccolse alcuni apologhi politici con riferimenti evidenti all’attualità.
                    Come evidenziato da Francesca Serra ciò che accomuna tutti questi testi è la presenza di un’ambientazione unidimensionale – un generico paese senza nome o luoghi d’invenzione come Sant’Alcide, Marzalia, Panduria, Cocinindia o Atrabilia – «dedita a una sola cosa, che sottostà a una sola regola, che conosce un solo modo d’essere». Nella quasi totalità dei casi questa situazione iniziale viene messa a dura prova da un accadimento inatteso, che scombina l’ordine delle cose e da cui si ricava spesso un insegnamento o una morale.
                    L’aspetto più interessante di questi racconti scritti a metà degli anni Cinquanta – e anche quello che balza subito all’occhio – è il fatto che sia possibile riconoscere in nuce, pertanto in forma acerba e a tratti elementare, alcuni elementi fondanti delle Città Invisibili: l’ambientazione unidimensionale, la regola o il carattere sui generis che connota la città, i nomi dei luoghi esclusivamente femminili. È significativo: pur senza arrivare a tracciare un legame consapevole tra questo gruppo di testi minori e l’opera che consacrerà Calvino nel 1972, si può comunque riconoscere, in filigrana, un percorso organico e continuativo, che affonda le radici in un tempo piuttosto lontano e trova il suo compimento negli anni Settanta del Novecento.
                    </p>
            </div>

            <div className={SheetStyles.gridRow}>
            <h2 className={SheetStyles.titleH2}>Bibliografia</h2>
              <ol className={SheetStyles.paragraph+' references '}>
                  <li className={SheetStyles.referenceItem}>
                  Frank Zipfel, Fiktion, Fiktivität, Fiktionalität: Analysen zur Fiktion in der Literatur und zum Fiktionsbegriff in der
                  Literaturwissenschaft, Erich Schmidt Verlag, Berlin 2001. Barbara Piatti, Die Geographie der Literatur. Schauplätze,
                  Handlungsräume, Raumphantasien, Wallstein, Göttingen 2008.
                  </li>
                  <li className={SheetStyles.referenceItem}>
                  Cfr. Barbara Patti et al, Mapping Literature: Towards a Geography of Fiction, in William Cartwright, Georg Gartner,
                  Antje Lehn (a cura di), Cartography And art, Springer, Berlin 2009, pp. 177-199. O anche Anne-Kathrin Reuschel, Lorenz
                  Hurni, Mapping Literature: Visualisation of Spatial Uncertainty in Fiction, «The Cartographic Journal», vol. 48, n. 4, 2011,
                  p. 296.</li>
                  <li className={SheetStyles.referenceItem}>
                  Francesca Serra, Calvino, Salerno, Roma 2006, p. 322.</li>
                  <li className={SheetStyles.referenceItem}>
                   «Calvino è sempre stato un narratore che non sente il romanzo, che persino ne diffida. Narratore anti-romanzesco: nel senso che la problematica sociale e morale, la scienza della vita quotidiana come microstoriografia, che caratterizzano il romanzo moderno, sono sempre stati fuori del suo orizzonte».
                   Alfonso Berardinelli, Calvino moralista. Ovvero restare sani dopo la fine del mondo, in «Diario», VII, 9, 1991, p. 39</li>
              </ol>
            </div>

          <div className={SheetStyles.gridRow}>
            <div style={{gridColumn:'1 / span 3'}}><ArrowButton arrowDirection="none" textAlign="left" text="ANALISI" route="/Process/transforming" /></div>
            <div style={{gridColumn:'4 / span 2'}}><ArrowButton arrowDirection="left" textAlign="right" text="TAPPA 1" route="/Phenomena/territory/spaceAnalysis"/></div>
            <div style={{gridColumn:'6 / span 2'}}><ArrowButton arrowDirection="right" textAlign="left" text="TAPPA 3" route="/Problem/realism" /></div>
          </div>
        </main>
      </>
    );
  }
}
