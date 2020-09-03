import React from 'react';
import { shallow } from 'enzyme';
import CancellationInformationSheet from './CancellationInformationSheet';

describe('<CancellationInformationSheet />', () => {
  test('renders', () => {
    const wrapper = shallow(<CancellationInformationSheet />);
    expect(wrapper).toMatchSnapshot();
  });
});
