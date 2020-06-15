import React from 'react';
import { shallow } from 'enzyme';
import TransformInformationSheet from './TransformInformationSheet';

describe('<TransformInformationSheet />', () => {
  test('renders', () => {
    const wrapper = shallow(<TransformInformationSheet />);
    expect(wrapper).toMatchSnapshot();
  });
});
