import axios from 'axios';
import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING } from './types';

export const getItems = () => dispatch => {
    // GET SOME STUFF TO SEND AS A PAYLOAD
    dispatch(setItemsLoading());
    axios
        .get('/api/items')
        .then(res => dispatch({
            type: GET_ITEMS,
            payload: res.data
        }))
        .catch(err => console.log(err));
}

export const addItem = (item) => {
    // GET SOME STUFF TO SEND AS A PAYLOAD
    return {
        type: ADD_ITEM,
        payload: item
    }
}

export const deleteItem = (id) => {
    // GET SOME STUFF TO SEND AS A PAYLOAD
    return {
        type: DELETE_ITEM,
        payload: id
    }
}

export const setItemsLoading = () => {
    return {
        type: ITEMS_LOADING
    }
}