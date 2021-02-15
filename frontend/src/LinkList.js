import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import LinksFromAPICall from './LinksFromAPICall'

function LinkList() {
    const links = LinksFromAPICall()

    return (
        <div>
            <h4>Here are the links</h4>
            <div className="row">{links}</div>
        </div>
    )
}

export default LinkList
