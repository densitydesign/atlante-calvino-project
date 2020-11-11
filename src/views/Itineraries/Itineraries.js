import React from "react"
import { ReactComponent as DubbioIcon } from "../IndexMenu/icons/dubitare_blue.svg"
import { ReactComponent as NebbiaIcon } from "../IndexMenu/icons/nebbia_blue.svg"
import { ReactComponent as CancellazioneIcon } from "../IndexMenu/icons/cancellazione_blue.svg"
import { ReactComponent as TrasformareIcon } from "../IndexMenu/icons/trasformare_blue.svg"
import { ReactComponent as LuoghiIcon } from "../IndexMenu/icons/luoghi_blue.svg"
import { ReactComponent as RealismoIcon } from "../IndexMenu/icons/realismo_blue.svg"
import { ReactComponent as ElenchiIcon } from "../IndexMenu/icons/elenchi_blue.svg"
import { ReactComponent as CombinareIcon } from "../IndexMenu/icons/combinare_blue.svg"
import { ReactComponent as TramaIcon } from "../IndexMenu/icons/trama_blue.svg"
import "./Itineraries.css"
import "../../general/GridsWithScrollableColumns/GridWithScrollableLeftColumn.css"
import "../../general/GridsWithScrollableColumns/ScrollableColumn.css"
import IndexMenuHeader from "../../headers/IndexMenuHeader"
import { Link } from "react-router-dom"
import Footer from "../../headers/Footer/Footer"

export default class Itineraries extends React.Component {
  render() {
    return (
      <>
        <IndexMenuHeader />
        <div className="grid-with-scrollable-left-column">
          <div className="scrollable-column-2 col-md-12 col-lg-8">
            <section id="doubt">
              <h1 className="text-dark-blue">Il Dubbio</h1>
              <p>
                Nell’itinerario che pone al centro il dubbio, si tenterà di
                analizzare un fenomeno che tende a dilagare nell’opera di
                Calvino, soprattutto a partire dagli anni Sessanta. Tormentato
                da un dubbio fondamentale, che riguarda la capacità delle parole
                di dire le cose giuste, il testo torna continuamente indietro
                per cancellarsi e ricominciare. Trovando nel processo di
                negazione, rettifica e riformulazione una paradossale ma potente
                spinta narrativa: la scrittura si disperde nel dubbio e nello
                stesso tempo si salva, perché s’inventa un modo per non finire
                mai. Il testo dubitativo è un testo dove a un certo punto la
                nebbia sale, confondendo ogni cosa: da una parte c’è la grande
                paura di avere sbagliato strada, dall’altra quella di non vedere
                più nulla. In mezzo dovremo riconoscere la prossimità che la
                letteratura ha con la morte, mentre cammina in bilico sul suo
                rovescio vuoto e contempla la cancellazione di tutto quello che
                riuscirà a dire. Prima ancora di averlo detto.
              </p>
              <div className="d-flex justify-content-between">
                <div className="d-flex flex-column align-items-center">
                  <NebbiaIcon height="100" />
                  <div className="mt-3 itineraries-small-text font-weight-bold">
                    <span>TAPPA</span>
                    <Link  className="ml-1 number-tappa link-tappa" to='/doubt/phase1'>1</Link>
                    <span className='ml-1'>NEBBIA</span>
                  </div>
                </div>
                <div className="d-flex flex-column align-items-center">
                  <DubbioIcon height="100" />
                  <div className="mt-3 itineraries-small-text font-weight-bold">
                    <span>TAPPA</span>
                    <Link className="ml-1 number-tappa link-tappa" to='/doubt/phase2'>2</Link>
                    <span className='ml-1'>DUBITARE</span>
                  </div>
                </div>
                <div className="d-flex flex-column align-items-center">
                  <CancellazioneIcon height="100" />
                  <div className="mt-3 itineraries-small-text font-weight-bold">
                    <span>TAPPA</span>
                    <Link className="ml-1 number-tappa link-tappa" to='/doubt/phase3'>3</Link>
                    <span className='ml-1'>CANCELLAZIONE</span>
                  </div>
                </div>
              </div>
            </section>
            <section id="space">
              <h1 className="text-dark-blue">Lo Spazio</h1>
              <p>
                Nell’itinerario che pone al centro lo spazio, si tenterà di analizzare i modi in cui Calvino ha usato lo spazio per parlare della realtà. E nello stesso tempo per negarla. Perché un momento dopo averla nominata, la realtà si è già trasformata in qualcos’altro. Le parole, che vorrebbero fermare le cose in un punto dello spazio, si perdono in un inseguimento senza fine. Nell’opera di Calvino lo spazio sembra avere più importanza del tempo. Tale predominanza spaziale sembra inoltre essere collegata a quella “visuale” che caratterizza la sua scrittura. In quale misura tali impressioni siano vere e quali forme prendano nel corso degli anni è ciò che dovremo riuscire a capire meglio, percorrendo questo itinerario che ci porterà nel cuore stesso dell’idea di letteratura di Calvino. Sia che racconti della Liguria biografica sia che ci trasporti nell’astrazione cosmica, infatti, Calvino ci dimostra come la letteratura sia il più sofisticato strumento che l’umanità abbia per interrogarsi sul complesso e fondamentale rapporto che la realtà intrattiene con la finzione.
              </p>

              <div className="d-flex justify-content-between">
                <div className="d-flex flex-column align-items-center">
                  <LuoghiIcon height="100" />
                  <div className="mt-3 itineraries-small-text font-weight-bold">
                    <span>TAPPA</span>
                    <Link to='/space/phase1' className="ml-1 number-tappa link-tappa">1</Link>
                    <span className='ml-1'>LUOGHI</span>
                  </div>
                </div>
                <div className="d-flex flex-column align-items-center">
                  <TrasformareIcon height="100" />
                  <div className="mt-3 itineraries-small-text font-weight-bold">
                    <span>TAPPA</span>
                    <Link to='/space/phase2' className="ml-1 number-tappa link-tappa">2</Link>
                    <span className='ml-1'>TRASFORMARE</span>
                  </div>
                </div>
                <div className="d-flex flex-column align-items-center">
                  <RealismoIcon height="100" />
                  <div className="mt-3 itineraries-small-text font-weight-bold">
                    <span>TAPPA</span>
                    <Link to='/space/phase3' className="ml-1 number-tappa link-tappa">3</Link>
                    <span className='ml-1'>REALISMO</span>
                  </div>
                </div>
              </div>
            </section>

            <section id="form">
              <h1 className="text-dark-blue">La Forma</h1>
              <p>
                Nell’itinerario che pone al centro la forma, si tenterà di studiare i modi in cui la scrittura di Calvino si sforza di dare forma alla realtà. Se esiste una battaglia delle battaglie che la letteratura ha il dovere di combattere, come un nobile paladino dell’esercito di Carlo Magno, questa è per Calvino la battaglia contro l’informe. L’informe che ci assedia e minaccia da ogni parte. Vincerla forse è impossibile, ma bisogna continuare a provarci. In che modo? Schierando per esempio le parole in lunghe file di elenchi, che facciano argine al caos; o al contrario lo riproducano, quel caos dilagante, nel tentativo di padroneggiarlo. Oppure costruendo elaborate strutture fatte di racconti in serie, concatenati. Per Calvino, l’arma della combinazione sembra sia quella che possa salvarci dall’assedio del magma. Alla ricerca di una trama che ormai il Novecento ha messo in soffitta da tempo, Calvino sperimenta le forme narrative più varie nel corso della sua carriera letteraria. Anche se forse non erano altro che travestimenti di un’unica trama, elementare e ossessiva.
              </p>

              <div className="d-flex justify-content-between">
                <div className="d-flex flex-column align-items-center">
                  <ElenchiIcon height="100" />
                  <div className="mt-3 itineraries-small-text font-weight-bold">
                    <span>TAPPA</span>
                    <Link to='/form/phase1' className="ml-1 number-tappa link-tappa">1</Link>
                    <span className='ml-1'>ELENCHI</span>
                  </div>
                </div>
                <div className="d-flex flex-column align-items-center">
                  <CombinareIcon height="100" />
                  <div className="mt-3 itineraries-small-text font-weight-bold">
                    <span>TAPPA</span>
                    <Link to='/form/phase2' className="ml-1 number-tappa link-tappa">2</Link>
                    <span className='ml-1'>COMBINARE</span>
                  </div>
                </div>
                <div className="d-flex flex-column align-items-center">
                  <TramaIcon height="100" />
                  <div className="mt-3 itineraries-small-text font-weight-bold">
                    <span>TAPPA</span>
                    <Link to='/form/phase3' className="ml-1 number-tappa link-tappa">3</Link>
                    <span className='ml-1'>TRAMA</span>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <div className="unscrollable-column col-md-12 col-lg-8">
            <h1>I tre itinerari</h1>
            <p className="intro text-dark-blue">
              I tre itinerari sono autonomi, ma profondamente connessi fra loro.
              Prima viene il dubbio, elevato da Calvino a strumento conoscitivo
              e narrativo fondamentale. Poi lo spazio, che àncora la scrittura
              alla realtà e insieme la sbalza nell’astrazione. Infine il
              tormento principale: quello della forma che l’opera deve prendere.
              Quale trama inventarsi per chiamare dentro il testo lettori e
              lettrici? Il dubbio crea lo spazio del racconto, mentre il suo
              plot si costruisce e si disfa davanti ai nostri occhi come una
              tela di Penelope.
            </p>
          </div>
        </div>
        <Footer />
      </>
    )
  }
}
