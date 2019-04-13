import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING } from '../actions/types';

// item state
const initState = {
    items: [],
    isLoading: false
};

export default function(state = initState, action) {
    switch(action.type) {
        case GET_ITEMS:
            // DO SOME STUFF TO CHANGE THE STATE
            return {
                ...state,
                items: action.payload,
                loading: false
            }
        case DELETE_ITEM:
            // DO SOME STUFF TO CHANGE THE STATE
            return {
                ...state,
                items: state.items.filter(item => item._id !== action.payload)
            }

        case ADD_ITEM:
            let newItems = [action.payload, ...state.items];
            return {
                ...state,
                items: newItems
            }

        case ITEMS_LOADING:
            return {
                ...state,
                isLoading: true
            }

        default:
            return state;
    }
}