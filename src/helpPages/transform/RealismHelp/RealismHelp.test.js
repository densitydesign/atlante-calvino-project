import React from 'react';
import { shallow } from 'enzyme';
import RealismHelp from './RealismHelp';

describe('RealismHelp', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<RealismHelp />);
    expect(wrapper).toMatchSnapshot();
  });
});
