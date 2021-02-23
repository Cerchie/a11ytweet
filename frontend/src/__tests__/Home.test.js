import { render } from '@testing-library/react'
import React from 'react'
import Home from '../Home'
import { MemoryRouter } from 'react-router'
import { UserProvider } from '../testutils/userProvider'

test('renders comp', () => {
    render(<Home />)
})

it('matches snapshot', function () {
    const { asFragment } = render(
        <MemoryRouter>
            <UserProvider>
                <Home />
            </UserProvider>
        </MemoryRouter>
    )
    expect(asFragment()).toMatchSnapshot()
})

it('matches snapshot when logged out', function () {
    const { asFragment } = render(
        <MemoryRouter>
            <UserProvider currentUser={null}>
                <Home />
            </UserProvider>
        </MemoryRouter>
    )
    expect(asFragment()).toMatchSnapshot()
})
