import React from 'react';
import { shallow } from 'enzyme';
import Trasformare from './Trasformare';

describe('<Trasformare />', () => {
  test('renders', () => {
    const wrapper = shallow(<Trasformare />);
    expect(wrapper).toMatchSnapshot();
  });
});
