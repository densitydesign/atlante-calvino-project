import React from 'react';

import HamburgerCompassHeader from '../../headers/HamburgerCompassHeader/HamburgerCompassHeader';
import ListTypesPerTextWrapper from '../../visualizations/ListTypesPerText/ListTypesPerTextWrapper';

import '../../App.css';
import './ShapeInformationSheet.css';

export default class ShapeInformationSheet extends React.Component
{
  render()
  {
    return (
      <>
      <div id="main--shape">
        <HamburgerCompassHeader />
          <div className="viz--meta">
            <h1>SCHEDA FORMA</h1>
            <div className="viz--info">
              <div id="label">
                <p><i>Clicca per scoprire titoli, anni.</i></p>
              </div>
              <div id="legend"><p><img src={process.env.PUBLIC_URL + "/informationSheets/Scheda_Forma_dimensione.svg"} width="650"/></p></div>
              <div id="type-button"><button>Dividi per tipologia</button></div>
              <div id="title--values"></div>
            </div>
          </div>
          <ListTypesPerTextWrapper  />
          <article>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed efficitur dictum sapien sed sollicitudin. Nunc eu rhoncus tortor, vitae vulputate dolor. Fusce interdum tortor id augue ullamcorper consequat a sed quam. In interdum elementum purus, at dapibus justo mollis rhoncus. Etiam rhoncus nec nulla a vulputate. Etiam tincidunt consectetur metus in condimentum. Pellentesque sapien lectus, consectetur eu risus non, rutrum pellentesque arcu. Curabitur eros magna, mattis sit amet nisi ut, lobortis pretium nibh. Morbi malesuada diam quis nunc aliquam, ac consequat augue cursus. Quisque eu velit eget lacus gravida pellentesque. Nam viverra laoreet felis at lacinia. Quisque cursus imperdiet elit, ultricies consectetur neque rutrum et. Nam mattis dui nulla, quis pretium massa suscipit vel.
          </p>
          </article>
          </div>
      </>
    );
  }
}
