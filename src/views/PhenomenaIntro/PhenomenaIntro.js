import React from 'react'

import HamburgerCompassHeader from '../../headers/HamburgerCompassHeader/HamburgerCompassHeader';
import LinkParagraph from './LinkParagraph';

import './PhenomenaIntro.css';

export default class PhenomenaIntro extends React.Component
{
  render()
  {
    return (
      <>
        <HamburgerCompassHeader />
        <div class="phenomena-intro-grid">
          <div>
            <h1>I FENOMENI</h1>
            <p>L'arcipelago esplora l'opera di Calvino come fosse un territorio. I suoi libri allora ci sono apparsi come un insieme di isole,
              tra loro collegate in un arcipelago, che rappresentavano la voglia di esplorare il mondo come un insieme di fenomeni : gli elenchi, la nebbia e i luoghi.
            </p>
          </div>
          <div class="itineraries-subgrid">
            <LinkParagraph route="/archipelago" linkText="Forma" description="Calvino è sempre stato un maniaco degli elenchi. L'elenco può funzionare come marca di realismo o all'opposto come fuga nell'astrazione. Fa vedere alcune cose, ma se aumenta il suo voltaggio, scivolando nel delirio elencatorio, non fa vedere più nulla" />
            <LinkParagraph route="/" linkText="Nebbia" description="Ci immerge in una densa nebbia, dove il territorio si cancella e il suo significato ci sfugge." />
            <LinkParagraph route="/" linkText="Spazio" description="I luoghi allora diventano un appiglio incerto ma fondamentale tra visibile e invisibile." />
          </div>
        </div>        
      </>
    );
  }
}