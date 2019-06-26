/* eslint-disable */
import React from 'react'
import renderer from 'react-test-renderer'
import TextInput from '../../../src/components/UI/TextInput'

test('renders correctly', async () => {
  const tree = renderer.create(<TextInput />).toJSON()
  expect(tree).toMatchSnapshot()
})