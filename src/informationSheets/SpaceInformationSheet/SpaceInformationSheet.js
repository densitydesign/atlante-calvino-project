
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
        <h1>SCHEDA SPAZIO</h1>
          <h2>Inserire qua un sottotitolo</h2>
                <img src={process.env.PUBLIC_URL + "/informationSheets/Scheda_Spazio_Header.svg"}/>
                </div>
                <div className="viz--info">
                  </div>
                  <article className="focus">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed efficitur dictum sapien sed sollicitudin. Nunc eu rhoncus tortor, vitae vulputate dolor. Fusce interdum tortor id augue ullamcorper consequat a sed quam. In interdum elementum purus, at dapibus justo mollis rhoncus. Etiam rhoncus nec nulla a vulputate. Etiam tincidunt consectetur metus in condimentum. Pellentesque sapien lectus, consectetur eu risus non, rutrum pellentesque arcu. Curabitur eros magna, mattis sit amet nisi ut, lobortis pretium nibh. Morbi malesuada diam quis nunc aliquam, ac consequat augue cursus. Quisque eu velit eget lacus gravida pellentesque. Nam viverra laoreet felis at lacinia. Quisque cursus imperdiet elit, ultricies consectetur neque rutrum et. Nam mattis dui nulla, quis pretium massa suscipit vel.
                  </p>

                  <div className="sheet--info">
                    <ArrowButton arrowDirection="none" textAlign="left" text="ANALISI" route="/Phenomena/spaceAnalysis" />
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
