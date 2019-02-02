import actionType from '../../actions/actionType'

const initialState = {
    isOnShelf: true
}

export default (state = initialState, action) => {
    switch(action.type) {
        case actionType.P_ADD_TO_SHELF:
            return {
                ...state,
                isOnShelf: true
            }
        case actionType.P_REMOVE_TO_SHELF: 
            return {
                ...state,
                isOnShelf: false
            }
        default: 
            return state;
    }
}