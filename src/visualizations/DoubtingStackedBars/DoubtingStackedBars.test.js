import React from 'react';
import { shallow } from 'enzyme';
import DoubtingStackedBars from './DoubtingStackedBars';

describe('<DoubtingStackedBars />', () => {
  test('renders', () => {
    const wrapper = shallow(<DoubtingStackedBars />);
    expect(wrapper).toMatchSnapshot();
  });
});
