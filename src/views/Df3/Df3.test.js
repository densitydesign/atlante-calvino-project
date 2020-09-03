import React from 'react';
import { shallow } from 'enzyme';
import Df3 from './Df3';

describe('<Df3 />', () => {
  test('renders', () => {
    const wrapper = shallow(<Df3 />);
    expect(wrapper).toMatchSnapshot();
  });
});
