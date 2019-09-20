import React from 'react';
import { shallow } from 'enzyme';
import ContainerComp from './ContainerComp';

describe('<ContainerComp />', () => {
  test('renders', () => {
    const wrapper = shallow(<ContainerComp />);
    expect(wrapper).toMatchSnapshot();
  });
});
