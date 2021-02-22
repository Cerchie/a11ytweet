import { render, screen } from '@testing-library/react'
import React from 'react'
import Link from './Link'
import './styles/LinkList.css'

test('renders comp', () => {
    render(<Link />)
})
