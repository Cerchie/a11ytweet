import { render, screen } from '@testing-library/react'
import React from 'react'
import Signup from '../Signup'
import { MemoryRouter } from 'react-router'
import { UserProvider } from '../testutils/userProvider'

test('renders comp', () => {
    render(<Signup />)
})

it('matches snapshot', function () {
    const { asFragment } = render(
        <MemoryRouter>
            <UserProvider>
                <Signup />
            </UserProvider>
        </MemoryRouter>
    )
    expect(asFragment()).toMatchSnapshot()
})

it('matches snapshot when logged out', function () {
    const { asFragment } = render(
        <MemoryRouter>
            <UserProvider currentUser={null}>
                <Signup />
            </UserProvider>
        </MemoryRouter>
    )
    expect(asFragment()).toMatchSnapshot()
})
