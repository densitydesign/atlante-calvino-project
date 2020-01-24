
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
            Il progetto <em>Atlante Calvino: letteratura e visualizzazione</em> si propone di condurre una serie di ricerche approfondite sull’opera di Italo Calvino nel quadro delle Digital Humanities: in particolare attraverso gli strumenti per l’esplorazione e la visualizzazione dei dati (<em>Data Visualisation</em>) che lo sviluppo delle nuove tecnologie mette a nostra disposizione.
<br></br>
  Nato a Santiago de Las Vegas nel 1923 e morto a Siena nel 1985, Italo Calvino è probabilmente il più noto e studiato scrittore della letteratura italiana contemporanea. La statura internazionale della sua fama, insieme alla bibliografia critica ormai sterminata che lo riguarda e alla varietà sperimentale delle sue opere, lo rende un perfetto caso studio per una ricerca fondata sul contributo scientifico che la visualizzazione dei dati può fornire agli studi letterari. Il progetto si caratterizza per la stretta collaborazione tra l’équipe specializzata in studi di letteratura italiana con base all’Università di Ginevra e il laboratorio di ricerca DensityDesign del Politecnico di Milano, specializzato nella progettazione di artefatti comunicativi che sfruttano il potenziale della visualizzazione delle informazioni. Le due anime del progetto, quella letteraria e quella del design dell'informazione, sono chiamate a mescolarsi per trovare soluzioni efficaci e innovative intorno al caso esemplare dell’opera di Calvino: l’opportunità di stabilire un contatto intensivo tra uno specifico oggetto letterario e l’analisi di sistemi complessi condotta tramite la visualizzazione è l’obiettivo principale di questa ricerca.
</p>
<br></br>
<p>Il lavoro concreto consisterà nella creazione di una piattaforma web, che offra la possibilità di esplorare l’opera così nota dello scrittore da un punto di vista inedito: vale a dire attraverso un certo numero di elaborazioni visuali, che corrisponderanno ad altrettante interrogazioni rivolte al corpus dei testi calviniani. L’identificazione dei più interessanti fenomeni dell’opera e delle soluzioni visive più adeguate per rappresentarli, oltre che per esplorarli interattivamente, occuperà le due équipe nella prima fase della ricerca, dedicata alla messa a punto metodologica e alla raccolta dei dati; in seguito la ricerca proseguirà con la messa a punto della piattaforma web e con la preparazione di una serie di schede critiche di accompagnamento che completino la parte visuale. L’efficacia della direzione imboccata dalla ricerca verrà testata in itinere tramite l’organizzazione di due workshop alla fine di ciascuno dei primi due anni e di due presentazioni pubbliche della piattaforma web durante il terzo anno, in prossimità della conclusione della ricerca. Per quanto riguarda l’impatto scientifico della ricerca, l’unione tra la figura di un autore fondamentale della letteratura del XX secolo e una metodologia di studio innovativa ambisce a offrire un valido esempio di ricerca nel campo delle Digital Humanities di seconda generazione, che contribuisca all’attuale esigenza di rinnovamento delle discipline letterarie. L’impatto scientifico del progetto si dovrà combinare, in questo senso, con le sue qualità pedagogiche, estetiche e comunicative, proponendo una nuova “narrazione visuale” dell’autore.</p>
          </div>
        </div>
        <Footer />
      </>


    );
  }
}
