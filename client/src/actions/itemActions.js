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

export const addItem = (item) => dispatch => {
    // GET SOME STUFF TO SEND AS A PAYLOAD
    axios
        .post('/api/items', item)
        .then(res => dispatch({
            type: ADD_ITEM,
            payload: res.data
        }))
        .catch(err => console.log(err))
}

export const deleteItem = (id) => dispatch => {
    // GET SOME STUFF TO SEND AS A PAYLOAD
    axios
        .delete(`/api/items/${id}`)
        .then(res => dispatch({
            type: DELETE_ITEM,
            payload: id
        }))
        .catch()
}

export const setItemsLoading = () => {
    return {
        type: ITEMS_LOADING
    }
}