import React from 'react';
import { shallow } from 'enzyme';
import MultipleSelection from './MultipleSelection';

describe('<MultipleSelection />', () => {
  test('renders', () => {
    const wrapper = shallow(<MultipleSelection />);
    expect(wrapper).toMatchSnapshot();
  });
});
