import React from 'react'

const INITIAL_STATE = { list_items: [] }

function rootReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'ADD_TO_LIST':
            return {
                ...state,
                list_items: [
                    ...state.list_items.filter(
                        (item) => item.full_name !== action.list_item.full_name //not most efficient, going thru whole arr
                    ),
                    { ...action.list_item },
                ],
            }

        case 'REMOVE_FROM_LIST': //this is getting called when I hit the add btn for some reason
            console.log('action.listitem from REMOVE', action.list_item)
            return {
                ...state,
                list_items: [
                    ...state.list_items.filter(
                        (item) => item.url !== action.list_item.url
                    ),
                ],
            }

        default:
            return state
    }
}

export default rootReducer
