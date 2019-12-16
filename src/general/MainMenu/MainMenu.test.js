import React from 'react';
import { shallow } from 'enzyme';
import '../../App.css';
import MainMenu from './MainMenu';

describe('<MainMenu />', () => {
  test('renders', () => {
    const wrapper = shallow(<MainMenu />);
    expect(wrapper).toMatchSnapshot();
  });
});
