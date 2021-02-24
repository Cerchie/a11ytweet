import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Link from './Link'
function UsersLinkList() {
    const dispatch = useDispatch()
    const list_items = useSelector((st) => st.list_items)
    function addItem(newItem) {
        dispatch({ type: 'ADD_TO_LIST', list_item: newItem })
    }
    function deleteItem(itemToDelete) {
        dispatch({
            type: 'REMOVE_FROM_LIST',
            list_item: itemToDelete,
        })
    }
    function deleteItem(itemToDelete) {
        dispatch({
            type: 'REMOVE_FROM_LIST',
            list_item: itemToDelete,
        })
    }

    console.log('LINK ITEMS FROM USERLIST', list_items)
    return (
        <>
            <h1 className="shadow-lg text-red-600 text-6xl p-6 m-12">
                a11y repos
            </h1>
            <ol className="shadow-xl text-red-700 text-2xl p-6 m-12">
                {list_items.map((list_item) => (
                    <Link
                        key={list_item.id}
                        url={list_item.url}
                        full_name={list_item.full_name}
                        addItem={addItem}
                        deleteItem={deleteItem}
                    />
                ))}
            </ol>
        </>
    )
}

export default UsersLinkList
