import actionType from "../../actions/actionType";

const initialState = {
  id: '',
  displayName: '',
  isLogin: false,
  role: null,
  token: '',
  avatar: ''
}

const userInfo = JSON.parse(window.sessionStorage.getItem('userInfo')) || initialState

export default (state = userInfo, action) => {
  let newState = state
  switch(action.type) {
    case actionType.LOGIN_SUCCESS:
      newState = {
        ...state,
        ...action.payload,
        isLogin: true
      }
      break;
    case actionType.LOGOUT:
      newState =  {
        ...state,
        id: '',
        displayName: '',
        isLogin: false,
        role: null,
        token: '',
        avatar: ''
      }
      break;
    default:
      break;
  }
  window.sessionStorage.setItem('userInfo', JSON.stringify(newState))
  return newState
}
