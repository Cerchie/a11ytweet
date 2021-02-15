import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import LinksFromAPICall from './LinksFromAPICall'

function LinkList() {
    const links = LinksFromAPICall()
    console.log('links', links)
    const linksListed = Object.keys(links).map((id) => (
        <div className="col-md-3 mb-3" key={id}>
            <div className="card">
                <div className="card-body">
                    <h2 className="card-title text-center">
                        <div> links from API call {links}</div>
                    </h2>
                </div>
            </div>
        </div>
    ))
    return (
        <div>
            <h4>Here are the links</h4>
            <div className="row">{linksListed}</div>
        </div>
    )
}

export default LinkList
