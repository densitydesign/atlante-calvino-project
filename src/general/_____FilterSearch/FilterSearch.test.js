import React from 'react';
import { shallow } from 'enzyme';
import FilterSearch from './FilterSearch';

describe('<FilterSearch />', () => {
  test('renders', () => {
    const wrapper = shallow(<FilterSearch />);
    expect(wrapper).toMatchSnapshot();
  });
});
