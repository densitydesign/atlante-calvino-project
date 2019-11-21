import React from 'react';
import { shallow } from 'enzyme';
import RangeFilter from './RangeFilter';

describe('<RangeFilter />', () => {
  test('renders', () => {
    const wrapper = shallow(<RangeFilter />);
    expect(wrapper).toMatchSnapshot();
  });
});
