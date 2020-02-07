
import React from 'react';
import ArrowButton from '../../../general/ArrowButton/ArrowButton';
import { Link } from 'react-router-dom';


import './TerritoryDoubtHelp.css';

export default class TerritoryDoubtHelp extends React.Component
{
  render()
  {
    return (
      <>
      <strong>Itinerario ⟶ DUBBIO</strong>
      <h1>Il fenomeno della nebbia</h1>
      <h3>La raccolta dei dati</h3>
<p>Abbiamo cercato di costituire una geografia lessicale dei fenomeni nebbia e cancellazione nell’opera di Calvino. Sono state catalogate tutte le occorrenze delle parole collegate ai due fenomeni; nello specifico per la nebbia sono state prese in considerazione anche fenomeni atmosferici simili quali <em>bruma, caligine, foschia</em>.</p>
<h3>Il livelli di visualizzazione</h3>
<p>All’interno del territorio sono presenti tre livelli successivi che mostrano i dati raccolti, ogni volta articolati diversamente, in modo tale da formare un preciso percorso di lettura.</p>
<ul><li>Il I° livello mostra la presenza e l’intensità di uno dei due fenomeni a scelta in tutta l’opera, testo per testo. La visualizzazione consente di vedere separatamente l’evoluzione nel tempo dell’utilizzo di un solo fenomeno, unendo a questo parametro l’intensità con il quale è stato impiegato.</li>
<li>Il II° livello mostra la presenza e l’intensità dei due fenomeni riuniti assieme tramite un solo colore, <span style={{color: '#00c19c'}}>il verde</span>. Il perimetro delle isole mostra la proporzione dei fenomeni tra loro all’interno del testo.</li>
<li>Il III° livello mostra unicamente i testi in cui compaiono i fenomeni, escludendo le restanti isole. L’intensità cromatica del riempimento riproduce l’informazione veicolata nel I° livello, corrisponde ovvero all’intensità del fenomeno nel testo. L’estensione del riempimento riflette invece la proporzione illustrata nel II° livello.</li>
</ul>
      <div className="sheet--info">
        <ArrowButton arrowDirection="right" textAlign="left" text="TAPPA 2" route="/Process/intro" />
        <ArrowButton arrowDirection="right" textAlign="left" text="TAPPA 3" route="/Problem/intro" />
      </div>


      </>
    );
  }
}
