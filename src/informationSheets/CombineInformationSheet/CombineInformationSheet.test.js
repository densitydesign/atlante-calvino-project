import React from 'react';
import { shallow } from 'enzyme';
import CombineInformationSheet from './CombineInformationSheet';

describe('<CombineInformationSheet />', () => {
  test('renders', () => {
    const wrapper = shallow(<CombineInformationSheet />);
    expect(wrapper).toMatchSnapshot();
  });
});
