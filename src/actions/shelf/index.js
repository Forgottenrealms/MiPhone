import actionType from '../actionType'

export const addToShelf = () => {
    return {
        type: actionType.P_ADD_TO_SHELF
    }
}

export const removeToShelf = () => {
    return {
        type: actionType.P_REMOVE_TO_SHELF
    }
}