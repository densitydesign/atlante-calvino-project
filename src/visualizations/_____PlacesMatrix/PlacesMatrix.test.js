import React from 'react';
import { shallow } from 'enzyme';
import PlacesMatrix from './PlacesMatrix';

describe('<PlacesMatrix />', () => {
  test('renders', () => {
    const wrapper = shallow(<PlacesMatrix />);
    expect(wrapper).toMatchSnapshot();
  });
});
