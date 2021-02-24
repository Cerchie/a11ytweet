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
    //set classes here so jsx parsing works
    const onBtn = 'shadow-md rounded text-2xl text-white bg-green-500 p-2 m-2'
    const offBtn = 'shadow-md rounded text-2xl text-white bg-blue-500 p-2 m-2'

    const onBtnDel = 'shadow-md rounded text-2xl text-white bg-black p-2 m-2'
    const offBtnDel =
        'shadow-md rounded text-2xl text-black bg-white-500 p-2 m-2'

    return (
        <Fragment>
            {' '}
            <li className="text-red-600 text-2xl p-2 m-2">
                <Fragment>
                    <a href={url}> {full_name} </a>
                </Fragment>
                <button onClick={handleAdd} className={toggle ? onBtn : offBtn}>
                    Add link to your personal list
                </button>

                <button
                    onClick={handleDelete}
                    className={toggle ? onBtnDel : offBtnDel}
                >
                    Remove from your list
                </button>
                <a
                    href={`https://twitter.com/share?url=${url}&text="Check out this a11yrepo!"&hashtags=a11y`}
                    className="shadow text-blue-700 p-2 m-2"
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
