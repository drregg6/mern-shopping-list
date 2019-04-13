import uuid from 'uuid';
import { GET_ITEMS, ADD_ITEM, DELETE_ITEM } from '../actions/types';

// item state
const initState = {
    items: [
        { id: uuid(), name: 'Eggs' },
        { id: uuid(), name: 'Milk' },
        { id: uuid(), name: 'Steak' },
        { id: uuid(), name: 'Naan' }
    ]
};

export default function(state = initState, action) {
    switch(action.type) {
        case GET_ITEMS:
            // DO SOME STUFF TO CHANGE THE STATE
            return { ...state }
        default:
            // DO SOME STUFF TO CHANGE THE STATE
            return state;
    }
}