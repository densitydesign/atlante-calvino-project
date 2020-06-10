import React from 'react';
import { shallow } from 'enzyme';
import HesitationInformationSheet from './HesitationInformationSheet';

describe('<HesitationInformationSheet />', () => {
  test('renders', () => {
    const wrapper = shallow(<HesitationInformationSheet />);
    expect(wrapper).toMatchSnapshot();
  });
});
