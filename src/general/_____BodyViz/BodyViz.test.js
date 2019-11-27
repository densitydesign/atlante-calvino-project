import React from 'react';
import { shallow } from 'enzyme';
import BodyViz from './BodyViz';

describe('<BodyViz />', () => {
  test('renders', () => {
    const wrapper = shallow(<BodyViz />);
    expect(wrapper).toMatchSnapshot();
  });
});
