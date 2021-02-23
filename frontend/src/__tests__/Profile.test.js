import { render, screen } from '@testing-library/react'
import React from 'react'
import Profile from '../Profile'
import { MemoryRouter } from 'react-router'
import { UserProvider } from '../testutils/userProvider'

test('renders comp', () => {
    render(<Profile />)
})
it('matches snapshot', function () {
    const { asFragment } = render(
        <MemoryRouter>
            <UserProvider>
                <Profile />
            </UserProvider>
        </MemoryRouter>
    )
    expect(asFragment()).toMatchSnapshot()
})
