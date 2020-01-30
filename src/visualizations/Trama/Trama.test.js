import React from 'react';
import { shallow } from 'enzyme';
import Combine from './Combine';

describe('<Combine />', () => {
  test('renders', () => {
    const wrapper = shallow(<Combine />);
    expect(wrapper).toMatchSnapshot();
  });
});
