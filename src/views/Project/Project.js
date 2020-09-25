
import React from 'react';

import HamburgerIntroHeader from '../../headers/HamburgerIntroHeader/HamburgerIntroHeader';
import Footer from '../../headers/Footer/Footer';

import '../../general/GridsWithScrollableColumns/GridWithScrollableLeftColumn.css';
import '../../general/GridsWithScrollableColumns/ScrollableColumn.css';
import '../../App.css';

export default class Project extends React.Component
{
  render()
  {
    return (
      <>
        <HamburgerIntroHeader />
        <div className="grid-with-scrollable-column">
          <div className="scrollable-column-3 col-md-12 col-lg-8">
            <h1>PROGETTO</h1>
<p>
            Oggi Italo Calvino avrebbe quasi cento anni. E di fronte alle profonde trasformazioni a cui la letteratura, la stampa, i mezzi di comunicazione e la ricerca stanno assistendo non sarebbe rimasto chiuso a difendere la cittadella umanistica assediata. Sarebbe uscito a vedere.
</p>
<p>
  La letteratura come l’ha pensata, praticata e modellata Calvino tra gli anni Quaranta e gli anni Ottanta del secolo scorso aveva soprattutto un fine: quello di tenere la mente aperta. Renderla abbastanza elastica non certo da capire tutta la complessità del mondo, ma almeno da misurarla. E trarne qualche conseguenza: la prima di queste è che abbiamo bisogno di storie, perché la nostra mente non si limiti a riprodurre se stessa, ma attraverso la narrazione si trasformi in un grande laboratorio di possibilità. Aperto al futuro, grazie alla molteplicità di sguardi con cui partecipa alla costruzione del passato.
</p>
<p>
Il progetto finanziato dal Fondo Nazionale Svizzero e intitolato <em>Atlante Calvino: letteratura e visualizzazione</em> ha scommesso sulla critica letteraria come esercizio intellettuale di apertura mentale e sperimentazione. Per tre anni (2017-2020) il progetto ha messo in contatto un’équipe letteraria dell’<a href = "https://www.unige.ch/lettres/roman/unites/italien/accueil/" className="link">Unità d'italiano</a> dell’Università di Ginevra e il laboratorio di ricerca <a href = "https://www.densitydesign.org" className="link">DensityDesign Research Lab</a> del Politecnico di Milano, specializzato in progetti di Digital Humanities e Data Visualization, con la collaborazione della casa editrice Mondadori, che detiene i diritti italiani dell’intera opera di Calvino.
</p>
<p>
Le due anime del progetto, quella letteraria e quella del design dell’informazione, sono state chiamate a mescolarsi per trovare soluzioni efficaci e innovative intorno al caso esemplare dell’opera di Calvino: l’opportunità di mettere in contatto un oggetto letterario e analisi di sistemi complessi condotta tramite la visualizzazione è l’obiettivo principale di questa ricerca. Nato a Santiago de Las Vegas nel 1923 e morto a Siena nel 1985, Italo Calvino è uno dei più noti e studiati scrittori della letteratura italiana contemporanea. La statura internazionale della sua fama, insieme alla bibliografia critica ormai sterminata che lo riguarda e alla varietà sperimentale delle sue opere, lo rende un modello perfetto per una ricerca fondata sul contributo scientifico che la visualizzazione dei dati può fornire agli studi letterari.
</p>
<p>
Il risultato del progetto è la piattaforma web in cui vi trovate, che offre la possibilità di esplorare l’opera narrativa dello scrittore da un nuovo punto di vista: vale a dire attraverso un certo numero di elaborazioni visuali, che corrispondono ad altrettante interrogazioni letterarie rivolte al corpus dei testi calviniani. L’unione tra la figura di un autore fondamentale della letteratura del XX secolo e un metodo di studio innovativo ambisce a offrire un valido esempio di ricerca nel campo delle Digital Humanities di seconda generazione, che contribuisca all’attuale esigenza di rinnovamento delle discipline letterarie. La qualità scientifica del progetto si sforza di combinarsi, in questo senso, con le sue qualità pedagogiche, estetiche e comunicative, al fine di proporre una nuova “narrazione visuale” dell’autore.
</p>
          </div>
                  </div>
        <Footer />
      </>


    );
  }
}
