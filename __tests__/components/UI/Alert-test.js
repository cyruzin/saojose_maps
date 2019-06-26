/* eslint-disable */
import React from 'react'
import renderer from 'react-test-renderer'
import Alert from '../../../src/components/UI/Alert'

test('renders correctly', async () => {
  const tree = renderer.create(<Alert />).toJSON()
  expect(tree).toMatchSnapshot()
})