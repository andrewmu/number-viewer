import React from 'react';
import ReactDOM from 'react-dom';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import ValueInput from './ValueInput';

configure({ adapter: new Adapter() });

it('renders without crashing', () => {
  const setNumber = jest.fn();

  const div = document.createElement('div');
  ReactDOM.render(<ValueInput value="0.0" setNumber={setNumber} />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('displays the number', () => {
  const TEST_NUMBER = '1.23';
  const setNumber = jest.fn();
  const component = mount(<ValueInput value={TEST_NUMBER} setNumber={setNumber} />);

  expect(component.find('input').prop('value')).toBe(TEST_NUMBER);
});

it('updates the number', () => {
  const TEST_NUMBER = '1.23';
  const setNumber = jest.fn();
  const component = mount(<ValueInput value="0.0" setNumber={setNumber} />);

  const event = {target: {value: TEST_NUMBER}};
  component.find('input').simulate('change', event);
  expect(setNumber.mock.calls[0][0]).toBe(TEST_NUMBER);
});
