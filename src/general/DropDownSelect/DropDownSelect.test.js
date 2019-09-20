import React from 'react';
import { shallow } from 'enzyme';
import DropDownSelect from './DropDownSelect';

describe('<DropDownSelect />', () => {
  test('renders', () => {
    const wrapper = shallow(<DropDownSelect />);
    expect(wrapper).toMatchSnapshot();
  });
});
