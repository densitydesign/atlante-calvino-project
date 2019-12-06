import React from 'react';
import { shallow } from 'enzyme';
import Bussola from './Bussola';

describe('<Bussola />', () => {
  test('renders', () => {
    const wrapper = shallow(<Bussola />);
    expect(wrapper).toMatchSnapshot();
  });
});
