import React from 'react';
import { shallow } from 'enzyme';
import Cancellazione from './Cancellazione';

describe('<Cancellazione />', () => {
  test('renders', () => {
    const wrapper = shallow(<Cancellazione />);
    expect(wrapper).toMatchSnapshot();
  });
});
