import React from 'react';
import { shallow } from 'enzyme';
import RealismInformationSheet from './RealismInformationSheet';

describe('RealismInformationSheet', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<RealismInformationSheet />);
    expect(wrapper).toMatchSnapshot();
  });
});
