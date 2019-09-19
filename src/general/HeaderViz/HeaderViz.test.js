import React from 'react';
import { shallow } from 'enzyme';
import HeaderViz from './HeaderViz';

describe('<HeaderViz />', () => {
  test('renders', () => {
    const wrapper = shallow(<HeaderViz />);
    expect(wrapper).toMatchSnapshot();
  });
});
