import React from "react";
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import ErrorMessage from "./ErrorMessage";

test('message is not passed => returns default message', () => {
  render(<ErrorMessage />)
  const messageElements = screen.getByText(/Please try again/)
  expect(messageElements).toBeInTheDocument()
})

test('message is passed => returns message', () => {
  render(<ErrorMessage message="foo" />)
  const messageElements = screen.getByText("foo")
  expect(messageElements).toBeInTheDocument()
})
