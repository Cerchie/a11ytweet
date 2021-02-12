import React from 'react'
import links from './links'
const INITIAL_STATE = { list_items: [] }

function rootReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'ADD_TO_LIST':
            return {
                ...state,
                list_items: [...state.list_items, { ...action.list_item }],
            }
        case 'REMOVE_FROM_LIST':
            return { ...state, list_items: [] }
        default:
            return state
    }
}

export default rootReducer
