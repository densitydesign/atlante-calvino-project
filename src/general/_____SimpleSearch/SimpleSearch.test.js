import React from 'react';
import { shallow } from 'enzyme';
import SimpleSearch from './SimpleSearch';

describe('<SimpleSearch />', () => {
  test('renders', () => {
    const wrapper = shallow(<SimpleSearch />);
    expect(wrapper).toMatchSnapshot();
  });
});
