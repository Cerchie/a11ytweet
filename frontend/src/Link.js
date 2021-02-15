import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
function Link({ key, full_name, url, addItem, deleteItem }) {
    const list_items = useSelector((st) => st.list_items)
    function handleAdd(e) {
        e.preventDefault()
        addItem({ full_name, url })
    }
    function handleDelete(e) {
        console.log('LIST ITEMS BEFORE HANDLE DELETE', list_items)
        e.preventDefault()
        deleteItem()
        console.log('LIST ITEMS FROM HANDLEDELETE', list_items)
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
