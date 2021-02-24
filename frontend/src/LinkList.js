import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import LinksFromAPICall from './LinksFromAPICall'

function LinkList() {
    const links = LinksFromAPICall()
    if (links.length === 0) {
        return (
            <>
                <h1>No links returned from Github</h1>
            </>
        )
    }
    return (
        <>
            <h1 class="text-red-600 text-6xl">a11y repos</h1>
            <p id="link-list" class="text-red-600 text-2xl">
                {links}
            </p>
        </>
    )
}

export default LinkList
