import React from 'react';
import { shallow } from 'enzyme';
import SetOption from './SetOption';

describe('<SetOption />', () => {
  test('renders', () => {
    const wrapper = shallow(<SetOption />);
    expect(wrapper).toMatchSnapshot();
  });
});
