import actionType from '../../actions/actionType'

const initialState = {
  isLoading: false
}

export default (state = initialState, action) => {
  switch(action.type) {
    case actionType.G_REQUEST_START:
      return {
        ...state,
        isLoading: true
      }
    case actionType.G_REQUEST_COMPLETED:
      return {
        ...state,
        isLoading: false
      }
    default:
      return state;
  }
}