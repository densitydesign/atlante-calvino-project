import React from 'react';
import { shallow } from 'enzyme';
import RustyViz from './RustyViz';

describe('<RustyViz />', () => {
  test('renders', () => {
    const wrapper = shallow(<RustyViz />);
    expect(wrapper).toMatchSnapshot();
  });
});
