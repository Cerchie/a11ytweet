import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

function UsersLinkList() {
    const dispatch = useDispatch()
    const list_items = useSelector((st) => st.list_items)
    function addItem(newItem) {
        dispatch({ type: 'ADD_TO_LIST', list_item: newItem })
    }
    function deleteItem(itemToDelete) {
        dispatch({ type: 'REMOVE_FROM_LIST', list_item: itemToDelete })
    }
    function handleAdd(e) {
        e.preventDefault()
        addItem()
    }
    function handleDelete(e) {
        e.preventDefault()
        deleteItem()
    }
    console.log('LINK ITEMS FROM USERLIST', list_items)
    return (
        <div>
            <ol>
                {list_items.map((i) => (
                    <li>
                        <a href={i.url}> {i.full_name} </a>
                        <button onClick={deleteItem}>remove all links</button>
                    </li>
                ))}
            </ol>
        </div>
    )
}

export default UsersLinkList
