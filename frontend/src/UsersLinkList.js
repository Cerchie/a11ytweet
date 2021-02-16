import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

function UsersLinkList() {
    const dispatch = useDispatch()
    const list_items = useSelector((st) => st.list_items)
    function deleteItem(itemToDelete) {
        dispatch({
            type: 'REMOVE_FROM_LIST',
            list_item: itemToDelete,
        })
    }

    function handleDelete(e) {
        e.preventDefault()
        deleteItem({ fullname: i.full_name, url: i.url })
    }
    console.log('LINK ITEMS FROM USERLIST', list_items)
    return (
        <div>
            <ol>
                {list_items.map((i) => (
                    <li>
                        <a href={i.url}> {i.full_name} </a>
                        <button onClick={handleDelete}>remove link</button>
                    </li>
                ))}
            </ol>
        </div>
    )
}

export default UsersLinkList
