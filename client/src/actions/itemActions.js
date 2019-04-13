import { GET_ITEMS, ADD_ITEM, DELETE_ITEM } from './types';

export const getItems = () => {
    // GET SOME STUFF TO SEND AS A PAYLOAD
    return {
        type: GET_ITEMS
    }
}

export const addItem = (item) => {
    // GET SOME STUFF TO SEND AS A PAYLOAD
    return {
        type: ADD_ITEM
    }
}

export const delItem = (item) => {
    // GET SOME STUFF TO SEND AS A PAYLOAD
    return {
        type: DELETE_ITEM
    }
}