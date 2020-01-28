
import React from 'react';

import HamburgerCompassHeader from '../../headers/HamburgerCompassHeader/HamburgerCompassHeader';
import ListTypesPerTextWrapper from '../../visualizations/ListTypesPerText/ListTypesPerTextWrapper';

import './ShapeInformationSheet.css';

export default class ShapeInformationSheet extends React.Component
{
  render()
  {
    return (
      <>
        <HamburgerCompassHeader />
        <h1>SCHEDA FORMA</h1>
        <div>
          <div id="label">Click on a dot!</div>
          <div id="legend">Kiss</div>
          <div id="type-button">Hello</div>
        </div>
        <ListTypesPerTextWrapper  />
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed efficitur dictum sapien sed sollicitudin. Nunc eu rhoncus tortor, vitae vulputate dolor. Fusce interdum tortor id augue ullamcorper consequat a sed quam. In interdum elementum purus, at dapibus justo mollis rhoncus. Etiam rhoncus nec nulla a vulputate. Etiam tincidunt consectetur metus in condimentum. Pellentesque sapien lectus, consectetur eu risus non, rutrum pellentesque arcu. Curabitur eros magna, mattis sit amet nisi ut, lobortis pretium nibh. Morbi malesuada diam quis nunc aliquam, ac consequat augue cursus. Quisque eu velit eget lacus gravida pellentesque. Nam viverra laoreet felis at lacinia. Quisque cursus imperdiet elit, ultricies consectetur neque rutrum et. Nam mattis dui nulla, quis pretium massa suscipit vel.
        </p>


      </>
    );
  }
}
