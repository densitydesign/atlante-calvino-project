import React from 'react';
import { shallow } from 'enzyme';
import ExampleViz from './ExampleViz';

describe('<ExampleViz />', () => {
  test('renders', () => {
    const wrapper = shallow(<ExampleViz />);
    expect(wrapper).toMatchSnapshot();
  });
});
