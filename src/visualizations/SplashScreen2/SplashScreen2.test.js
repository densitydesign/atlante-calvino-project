import React from 'react';
import { shallow } from 'enzyme';
import SplashScreen2 from './SplashScreen2';

describe('SplashScreen2', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<SplashScreen2 />);
    expect(wrapper).toMatchSnapshot();
  });
});
