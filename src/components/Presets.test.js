import React from 'react';
import ReactDOM from 'react-dom';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Presets from './Presets';

configure({ adapter: new Adapter() });

it('renders without crashing', () => {
  const setNumber = jest.fn();

  const div = document.createElement('div');
  ReactDOM.render(<Presets setNumber={setNumber} />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('changes the number', () => {
  const setNumber = jest.fn();
  const component = mount(<Presets setNumber={setNumber} />);

  component.find('PresetButton[value="0"] button').simulate('click');
  expect(setNumber.mock.calls[0][0]).toBe('0');

  component.find('PresetButton[value="1"] button').simulate('click');
  expect(setNumber.mock.calls[1][0]).toBe('1');
});
