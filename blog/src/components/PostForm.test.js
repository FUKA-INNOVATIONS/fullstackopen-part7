import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
// eslint-disable-next-line no-unused-vars
import { prettyDOM } from '@testing-library/dom'
import PostForm from './PostForm'

test('<PostForm /> test', () => {
  const createPost = jest.fn()
  const component = render(
    <PostForm createPost={createPost} />
  )
  const titleInput = component.container.querySelector('#titleInput')
  const authorInput = component.container.querySelector('#authorInput')
  const urlInput = component.container.querySelector('#urlInput')
  const form = component.container.querySelector('form')
  fireEvent.change(titleInput,  {
    target: { value: 'Test title' }
  })
  fireEvent.change(authorInput,  {
    target: { value: 'Test author' }
  })
  fireEvent.change(urlInput,  {
    target: { value: 'www.test.url' }
  })
  fireEvent.submit(form)
  expect(createPost.mock.calls).toHaveLength(1)
  //expect(createPost.mock.calls[0][0].content).toBe('Test title')
  console.log(prettyDOM(authorInput))
})