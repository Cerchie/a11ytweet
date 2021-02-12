import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

function LinkList() {
    const links = useSelector((st) => st.list_items)
    const linksListed = Object.keys(links).map((id) => (
        <div className="col-md-3 mb-3" key={id}>
            <div className="card">
                <div className="card-body">
                    <h2 className="card-title text-center">
                        <Link to={`/products/${id}`}>{links}</Link>
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
