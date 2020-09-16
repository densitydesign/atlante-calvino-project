import React from 'react';
import { shallow } from 'enzyme';
import FoldingLine from './FoldingLine';

describe('<FoldingLine />', () => {
  test('renders', () => {
    const wrapper = shallow(<FoldingLine />);
    expect(wrapper).toMatchSnapshot();
  });
});
