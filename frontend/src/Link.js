import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
function Link({ key, full_name, url, addItem, deleteItem }) {
    const list_items = useSelector((st) => st.list_items)
    function handleAdd(e) {
        e.preventDefault()
        addItem({ full_name, url })
    }
    function handleDelete(e) {
        e.preventDefault()
        deleteItem({ full_name, url })
    }
    return (
        <div>
            {' '}
            <li>
                <a href={url}> {full_name} </a>
                <button onClick={handleAdd}>
                    Add link to your personal list
                </button>
                <button onClick={handleDelete}>
                    Remove all from your list
                </button>
            </li>
        </div>
    )
}

export default Link
