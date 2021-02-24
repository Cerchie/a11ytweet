import { render, screen } from '@testing-library/react'
import React from 'react'
import NavBar from '../NavBar'
import { BrowserRouter } from 'react-router-dom'
import { MemoryRouter } from 'react-router'
import { UserProvider } from '../testutils/userProvider'
test('renders comp', () => {
    render(
        <BrowserRouter>
            <NavBar />
        </BrowserRouter>
    )
})

it('matches snapshot', function () {
    const { asFragment } = render(
        <MemoryRouter>
            <UserProvider>
                <NavBar />
            </UserProvider>
        </MemoryRouter>
    )
    expect(asFragment()).toMatchSnapshot()
})

it('matches snapshot when logged out', function () {
    const { asFragment } = render(
        <MemoryRouter>
            <UserProvider currentUser={null}>
                <NavBar />
            </UserProvider>
        </MemoryRouter>
    )
    expect(asFragment()).toMatchSnapshot()
})
//not worried about the 'received true...' error for this reason https://github.com/styled-components/styled-components/issues/1198
