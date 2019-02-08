import { requestStart, requestCompleted } from '../global'
import { login } from '../../requests'
import actionType from '../actionType';

const loginSuccess = (data) => {
  return {
    type: actionType.LOGIN_SUCCESS,
    payload: data
  }
}

export const doLogin = (userLoginData) => {
  return dispath => {
    dispath(requestStart());
    login(userLoginData)
      .then(resp => {
        if (resp.data.code === 200) {
          dispath(loginSuccess(resp.data.data))
        } else {
          // 看看你想做什么吧
        }
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => {
        dispath(requestCompleted())
      })
  }
}

export const logout = () => {
  return {
    type: actionType.LOGOUT
  }
}