import React, { Fragment } from 'react'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

function Link({ key, full_name, url, addItem, deleteItem }) {
    const list_items = useSelector((st) => st.list_items)
    const [toggle, setToggle] = useState(false)
    function handleAdd(e) {
        e.preventDefault()
        addItem({ full_name, url })
        setToggle(true)
    }
    function handleDelete(e) {
        e.preventDefault()
        deleteItem({ full_name, url })
        setToggle(false)
    }
    return (
        <Fragment>
            {' '}
            <li className="list-li">
                <Fragment>
                    <a href={url}> {full_name} </a>
                </Fragment>
                <button
                    onClick={handleAdd}
                    className={toggle ? 'on-btn' : 'off-btn'}
                >
                    Add link to your personal list
                </button>

                <button
                    onClick={handleDelete}
                    className={toggle ? 'on-btn-del' : 'off-btn-del'}
                >
                    Remove from your list
                </button>
                <a
                    href={`https://twitter.com/share?url=${url}&text="Check out this a11yrepo!"&hashtags=a11y`}
                >
                    Tweet
                </a>

                <script
                    async
                    src="https://platform.twitter.com/widgets.js"
                    charset="utf-8"
                ></script>
            </li>
        </Fragment>
    )
}

export default Link
