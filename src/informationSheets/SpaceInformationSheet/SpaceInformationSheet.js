
import React from 'react';

import HamburgerCompassHeader from '../../headers/HamburgerCompassHeader/HamburgerCompassHeader';
import ArrowButton from '../../general/ArrowButton/ArrowButton';
import { Link } from 'react-router-dom';

import './SpaceInformationSheet.css';

export default class SpaceInformationSheet extends React.Component
{
  render()
  {
    return (
      <>
        <HamburgerCompassHeader />
        <div>
        <main>
        <div className="viz--meta">
        <h1>Luoghi. Scheda di approfondimento</h1>
          <h2>Le città invisibili, 1972</h2>
                <img src={process.env.PUBLIC_URL + "/informationSheets/Scheda_Spazio_Header.svg"} alt="information complement" />
                </div>
                <div className="viz--info">
                  </div>
                  <article className="focus">
                            <div>
                            <h3>Fine e inizio, astratto e concreto</h3>
                            <p>
                            Mettere a confronto l’inizio e la fine della carriera narrativa di Calvino permette di scoprire un dettaglio non trascurabile del modo in cui l’autore ha impiegato i due fenomeni nel corso della sua carriera. Il paragone mostra un rovesciamento dei rapporti di forza tra i due: la presenza della nebbia, più intensa nella produzione narrativa dei primi vent’anni, mano a mano diminuisce a favore della cancellazione. Eppure sono numerosi i critici ad affermare che sono proprio le opere tardive a essere frequentate maggiormente dal fenomeno atmosferico: la critica infatti ha spesso descritto i testi degli ultimi anni come immersi in un banco di nebbia.
                    La “cancellazione” è in un certo senso effetto o conseguenza della presenza della “nebbia”; a partire dagli anni Sessanta però sembra non ci sia più bisogno di integrare nel testo un elemento “fisico” in grado di giustificare la scomparsa dell’universo narrativo. La cancellazione si trasforma in una forza che trascende l’elemento naturale; l’universo narrativo si disfa senza cause apparenti sotto gli occhi del lettore.
                    Il confronto consente di verificare un altro cambiamento: il ribaltamento in entrambi i fenomeni dell’uso delle categorie concreto, dominante fra il ’44 e il ’48, e astratto, legata agli ultimi anni della produzione. Emerge la tendenza a spostarsi nel corso del tempo sempre più verso dimensioni incorporee. La nebbia di cui parlavano i critici a proposito delle opere tarde forse non era il vero e proprio elemento atmosferico, bensì una forma di comportamento del testo, un modo in cui il testo ne imita gli effetti.
                  </p>
                            </div>


                  <div className="sheet--info">
                    <ArrowButton arrowDirection="none" textAlign="left" text="ANALISI" route="/Phenomena/territory/spaceAnalysis" />
                    <ArrowButton arrowDirection="right" textAlign="left" text="TAPPA 2" route="/Process/intro" />
                    <ArrowButton arrowDirection="right" textAlign="left" text="TAPPA 3" route="/Problem/intro" />
                  </div>

                  </article>
        </main>
        </div>
      </>
    );
  }
}
