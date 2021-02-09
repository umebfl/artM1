import 'react-native'
import React from 'react'

import {
  LargeTitle,
  MidTitle,
  Title,
  DefText,
} from '../index'

import renderer from 'react-test-renderer'

describe('快照测试', () => {
  it('渲染LargeTitle', () => {
    const component = renderer.create(<LargeTitle>LargeTitle</LargeTitle>)
    expect(component).toMatchSnapshot()
  })
  
  it('渲染MidTitle', () => {
    const component = renderer.create(<MidTitle>MidTitle</MidTitle>)
    expect(component).toMatchSnapshot()
  })
  
  it('渲染Title', () => {
    const component = renderer.create(<Title>Title</Title>)
    expect(component).toMatchSnapshot()
  })

  it('渲染DefText', () => {
    const component = renderer.create(<DefText>DefText</DefText>)
    expect(component).toMatchSnapshot()
  })
})