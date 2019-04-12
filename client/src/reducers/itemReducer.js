import uuid from 'uuid';
import { GET_ITEMS, ADD_ITEM, DELETE_ITEM } from '../actions/types';

// item state
const initState = {
    items: [
        { id: uuid(), name: 'Eggs' },
        { id: uuid(), name: 'Milk' },
        { id: uuid(), name: 'Steak' },
        { id: uuid(), name: 'Water' }
    ]
};

export default function(state = initState, action) {
    switch(action.type) {
        case GET_ITEMS:
            return { ...state }
        case ADD_ITEM:
            return {
                items: [...state, action.payload];
            }
        default:
            return state;
    }
}