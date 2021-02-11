import React, { getState } from 'react'
import { render, screen } from '@testing-library/react'
import rootReducer from './rootReducer'

let store = createStore(rootReducer)
expect(store.getState().list_items).toEqual(list_items([]))

//grabbed code from https://github.com/Cerchie/shoply-react/blob/main/src/reducers/rootReducer.test.js
