import React from 'react';
import { shallow } from 'enzyme';
import MoreInfo from './MoreInfo';

describe('<MoreInfo />', () => {
  test('renders', () => {
    const wrapper = shallow(<MoreInfo />);
    expect(wrapper).toMatchSnapshot();
  });
});
