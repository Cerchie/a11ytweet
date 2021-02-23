import { render, screen } from '@testing-library/react'
import React from 'react'
import Login from '../Login'
import { MemoryRouter } from 'react-router'
import { UserProvider } from '../testutils/userProvider'

test('renders comp', () => {
    render(<Login />)
})
it('matches snapshot', function () {
    const { asFragment } = render(
        <MemoryRouter>
            <UserProvider>
                <Login />
            </UserProvider>
        </MemoryRouter>
    )
    expect(asFragment()).toMatchSnapshot()
})

it('matches snapshot when logged out', function () {
    const { asFragment } = render(
        <MemoryRouter>
            <UserProvider currentUser={null}>
                <Login />
            </UserProvider>
        </MemoryRouter>
    )
    expect(asFragment()).toMatchSnapshot()
})
