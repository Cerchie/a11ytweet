import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import LinksFromAPICall from './LinksFromAPICall'
import './styles/LinkList.css'

function LinkList() {
    const links = LinksFromAPICall()

    return (
        <>
            <main role="main">
                <h2>a11y repos</h2>
                <p id="link-list">{links}</p>
            </main>
        </>
    )
}

export default LinkList
