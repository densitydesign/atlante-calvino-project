import React from 'react';
import { shallow } from 'enzyme';
import SimpleDropDown from './SimpleDropDown';

describe('<SimpleDropDown />', () => {
  test('renders', () => {
    const wrapper = shallow(<SimpleDropDown />);
    expect(wrapper).toMatchSnapshot();
  });
});
