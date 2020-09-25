import React from 'react';
import { shallow } from 'enzyme';
import ProcessCombiningMainHelp from './ProcessCombiningMainHelp';

describe('ProcessCombiningMainHelp', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<ProcessCombiningMainHelp />);
    expect(wrapper).toMatchSnapshot();
  });
});
