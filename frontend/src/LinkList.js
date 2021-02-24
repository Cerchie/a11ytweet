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
            <h1 class="shadow-lg text-red-600 text-6xl p-6 m-12">a11y repos</h1>
            <p class="shadow-xl text-red-700 text-2xl p-6 m-12">{links}</p>
        </>
    )
}

export default LinkList
