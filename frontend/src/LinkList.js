import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import LinksFromAPICall from './LinksFromAPICall'
import './styles/LinkList.css'

function LinkList() {
    const links = LinksFromAPICall()

    return (
        <>
            <h2>a11y repos</h2>
            <p className="row">{links}</p>
        </>
    )
}

export default LinkList
