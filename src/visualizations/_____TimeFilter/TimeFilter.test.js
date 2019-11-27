import React from 'react';
import { shallow } from 'enzyme';
import TimeFilter from './TimeFilter';

describe('<TimeFilter />', () => {
  test('renders', () => {
    const wrapper = shallow(<TimeFilter />);
    expect(wrapper).toMatchSnapshot();
  });
});
