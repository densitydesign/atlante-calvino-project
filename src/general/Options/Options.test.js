import React from 'react';
import { shallow } from 'enzyme';
import Options from './Options';

describe('<Options />', () => {
  test('renders', () => {
    const wrapper = shallow(<Options />);
    expect(wrapper).toMatchSnapshot();
  });
});
