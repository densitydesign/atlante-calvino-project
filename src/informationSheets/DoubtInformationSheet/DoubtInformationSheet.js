
import React from 'react';

import HamburgerCompassHeader from '../../headers/HamburgerCompassHeader/HamburgerCompassHeader';
import DoubtTypePerYearWrapper from '../../visualizations/DoubtTypePerYear/DoubtTypePerYearWrapper';

import './DoubtInformationSheet.css';

export default class DoubtInformationSheet extends React.Component
{
  render()
  {
    return (
      <>
        <HamburgerCompassHeader />
        <main>
          <div className="viz--meta">
            <h1>SCHEDA DUBBIO</h1>
            <h2>Occorrenze campo semantico del dubbio</h2>
            <div className="viz--info">
              <div id="label"><p><i>Scopri i valori</i></p></div>
              <div id="legend"><p><img src={process.env.PUBLIC_URL + "/informationSheets/Scheda_Dubbio_dimensione.svg"} width="650"/></p></div>
            </div>
          </div>
          <DoubtTypePerYearWrapper  />
          <article>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed efficitur dictum sapien sed sollicitudin. Nunc eu rhoncus tortor, vitae vulputate dolor. Fusce interdum tortor id augue ullamcorper consequat a sed quam. In interdum elementum purus, at dapibus justo mollis rhoncus. Etiam rhoncus nec nulla a vulputate. Etiam tincidunt consectetur metus in condimentum. Pellentesque sapien lectus, consectetur eu risus non, rutrum pellentesque arcu. Curabitur eros magna, mattis sit amet nisi ut, lobortis pretium nibh. Morbi malesuada diam quis nunc aliquam, ac consequat augue cursus. Quisque eu velit eget lacus gravida pellentesque. Nam viverra laoreet felis at lacinia. Quisque cursus imperdiet elit, ultricies consectetur neque rutrum et. Nam mattis dui nulla, quis pretium massa suscipit vel.
          </p>
          </article>
          <article>
          <h3>Occorrenze campo semantico del dubbio</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed efficitur dictum sapien sed sollicitudin. Nunc eu rhoncus tortor, vitae vulputate dolor. Fusce interdum tortor id augue ullamcorper consequat a sed quam. In interdum elementum purus, at dapibus justo mollis rhoncus. Etiam rhoncus nec nulla a vulputate. Etiam tincidunt consectetur metus in condimentum. Pellentesque sapien lectus, consectetur eu risus non, rutrum pellentesque arcu. Curabitur eros magna, mattis sit amet nisi ut, lobortis pretium nibh. Morbi malesuada diam quis nunc aliquam, ac consequat augue cursus. Quisque eu velit eget lacus gravida pellentesque. Nam viverra laoreet felis at lacinia. Quisque cursus imperdiet elit, ultricies consectetur neque rutrum et. Nam mattis dui nulla, quis pretium massa suscipit vel.
          </p>
          <img className="col-md-6" />
          </article>
                    </main>
      </>
    );
  }
}
