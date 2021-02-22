import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import LinksFromAPICall from './LinksFromAPICall'

function LinkList() {
    const links = LinksFromAPICall()

    return (
        <>
            <h4>Here are the links</h4>
            <p className="row">{links}</p>
        </>
    )
}

export default LinkList
