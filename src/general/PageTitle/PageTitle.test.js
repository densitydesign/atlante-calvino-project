import React from 'react';
import { shallow } from 'enzyme';
import VizTitle from './VizTitle';

describe('<VizTitle />', () => {
  test('renders', () => {
    const wrapper = shallow(<VizTitle />);
    expect(wrapper).toMatchSnapshot();
  });
});
