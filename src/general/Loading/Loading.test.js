import React from 'react';
import { shallow } from 'enzyme';
import '../../App.css';
import Loading from './Loading';

describe('<Loading />', () => {
  test('renders', () => {
    const wrapper = shallow(<Loading />);
    expect(wrapper).toMatchSnapshot();
  });
});
