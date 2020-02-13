import React from 'react';
import { shallow } from 'enzyme';
import ProcessDoubting from './ProcessDoubting';

describe('<ProcessDoubting />', () => {
  test('renders', () => {
    const wrapper = shallow(<ProcessDoubting />);
    expect(wrapper).toMatchSnapshot();
  });
});
