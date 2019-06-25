/* eslint-disable */
import React from 'react'
import renderer from 'react-test-renderer'
import Text from '../../../src/components/UI/Text'

test('renders correctly', async () => {
  const tree = renderer.create(<Text />).toJSON()
  expect(tree).toMatchSnapshot()
})
