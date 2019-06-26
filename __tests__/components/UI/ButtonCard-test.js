/* eslint-disable */
import React from 'react'
import renderer from 'react-test-renderer'
import ButtonCard from '../../../src/components/UI/ButtonCard'

test('renders correctly', async () => {
  const tree = renderer.create(<ButtonCard />).toJSON()
  expect(tree).toMatchSnapshot()
})