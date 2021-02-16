import React from 'react'

const INITIAL_STATE = { list_items: [] }

function rootReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'ADD_TO_LIST':
            console.log('actionlistitem from ADD', action.list_item)
            return {
                ...state,
                list_items: [...state.list_items, { ...action.list_item }],
            }
        case 'REMOVE_ALL_FROM_LIST':
            return { ...state, list_items: [] }

        case 'REMOVE_FROM_LIST':
            console.log('actionlistitem from REMOVE', action.list_item)
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

// function rootReducer(state = INITIAL_STATE, action) {
//     switch (action.type) {
//         case 'ADD_TO_LIST': {
//             const listCopy = [...state.list_items, { ...action.list_item }]
//             listCopy[action.id] = (listCopy[action.id] || 0) + 1
//             return {
//                 ...state,
//                 list_items: listCopy,
//             }
//         }
//         case 'REMOVE_FROM_LIST': {
//             const listCopy = [...state.list_items, { ...action.list_item }]
//             if (!listCopy[action.id]) return state
//             listCopy[action.id]--
//             if (listCopy[action.id] === 0) {
//                 delete listCopy[action.id]
//             }
//             return {
//                 ...state,
//                 list_items: listCopy,
//             }
//         }
//         default:
//             return state
//     }
// }

export default rootReducer
