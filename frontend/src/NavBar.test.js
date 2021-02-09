import { render, screen } from '@testing-library/react'
import React from 'react'
import NavBar from './NavBar'
import { BrowserRouter } from 'react-router-dom'

test('renders comp', () => {
    render(
        <BrowserRouter>
            <NavBar />
        </BrowserRouter>
    )
})
