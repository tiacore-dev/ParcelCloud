import { createReducer } from "@reduxjs/toolkit";


export const parcels = createReducer<string[]>(
    ['123', '3234'],
    {
        ['add']: (state, { payload }) => {
            console.log(payload)
            return [...state, payload]
        }
    }
)