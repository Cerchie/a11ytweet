import { render, screen } from '@testing-library/react'
import React from 'react'
import GoHome from '../GoHome'
import { MemoryRouter } from 'react-router'
import { UserProvider } from '../testutils/userProvider'

test('renders app', () => {
    render(<GoHome />)
})

it('matches snapshot', function () {
    const { asFragment } = render(
        <MemoryRouter>
            <UserProvider>
                <GoHome />
            </UserProvider>
        </MemoryRouter>
    )
    expect(asFragment()).toMatchSnapshot()
})
