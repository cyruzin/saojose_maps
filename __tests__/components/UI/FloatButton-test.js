/* eslint-disable */
import React from 'react'
import renderer from 'react-test-renderer'
import FloatButton from '../../../src/components/UI/FloatButton'

test('renders correctly', async () => {
  const tree = renderer.create(<FloatButton />).toJSON()
  expect(tree).toMatchSnapshot()
})