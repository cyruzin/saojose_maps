/* eslint-disable */
import React from 'react'
import renderer from 'react-test-renderer'
import Button from '../../../src/components/UI/Button'

test('renders correctly', async () => {
  const tree = renderer.create(<Button />).toJSON()
  expect(tree).toMatchSnapshot()
})