
import React from 'react';

import HamburgerIntroHeader from '../../headers/HamburgerIntroHeader/HamburgerIntroHeader';

import '../../general/GridsWithScrollableColumns/GridWithScrollableLeftColumn.css';
import '../../general/GridsWithScrollableColumns/ScrollableColumn.css';

export default class AboutAndContacts extends React.Component
{
  render()
  {
    return (
      <>
        <HamburgerIntroHeader />
        <div className="grid-with-scrollable-left-column">
          <div className="scrollable-column" style={{ height : "99%" }}>
            <h1>ABOUT</h1>
            <strong>
            Équipe letteraria, Unité d'italien<br/>
            Département de langues et littératures romanes,<br/>
            Université de Genève
            </strong>
            <p>
            L'équipe letteraria del progetto lavora all'interno dell'Unità d'italiano del Département de langues et littératures romanes dell'Université de Genève. Il gruppo riunisce specialiste di critica letteraria e in particolare dell'opera di Italo Calvino, che affronteranno l'analisi dell'intero corpus narrativo calviniano, articolando i risultati della loro ricerca in modalità compatibili con gli strumenti di visualizzazione sviluppati dal DensityDesign Research Lab.</p>
            <br/>
            <br/>
            <ul style={{listStyleType : "none", paddingLeft : 0}}>
              <li>Francesca Serra</li>
              <li>Valeria Cavalloro</li>
              <li>Virginia Giustetto</li>
              <li>Margherita Parigini</li>
            </ul>

            <br/>
            <br/>
            <strong>DensityDesign Research Lab,<br/>
            Dipartimento di Design, Politecnico di Milano</strong><br/>
            <p>Il laboratorio di ricerca DensityDesign è parte del Dipartimento di Design del Politecnico di Milano.
            Obiettivo del laboratorio è la rappresentazione di fenomeni complessi di natura sociale, organizzativa o urbana. A questi temi va aggiunto il crescente interesse per le Digital Humanities, ed in particolare per tutto ciò che sta all'intersezione fra le materie umanistiche e l'information design, come la progettazione di artefatti e metodi digitali per l'elaborazione, l'accesso e la visualizzazione dell'informazione.</p>

            <br/>
            <br/>
            <ul style={{listStyleType : "none", paddingLeft : 0}}>
              <li>Michele Mauri</li>
              <li>Tommaso Elli</li>
              <li>Ángeles Briones</li>
              <li>Beatrice Gobbo</li>
              <li>Gabriele Colombo</li>
              <li>Marco Pappalepore</li>
            </ul>

          </div>
          <div className="unscrollable-column">
            <h1>CONTATTI</h1>
            <strong>Contatti</strong>
            <address>
              <ul style={{listStyleType : "none", paddingLeft : 0}}>
                <li>Mail: <a href="mailto:atlantecalvino@unige.ch">atlantecalvino@unige.ch</a></li>
                <li>Twitter: <a href="https://twitter.com/intent/tweet?screen_name=AtlanteCalvino&ref_src=twsrc%5Etfw" class="twitter-mention-button" data-show-count="false">@AtlanteCalvino</a><script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script></li>
              </ul>
            </address>
          </div>
        </div>        
      </>
    );
  }
}