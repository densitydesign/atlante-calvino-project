import React from 'react';
import { shallow } from 'enzyme';
import PlotInformationSheet from './PlotInformationSheet';

describe('PlotInformationSheet', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<PlotInformationSheet />);
    expect(wrapper).toMatchSnapshot();
  });
});
