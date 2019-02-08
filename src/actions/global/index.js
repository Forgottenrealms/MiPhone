import actionType from '../actionType'

export const requestStart = () => {
  return {
    type: actionType.G_REQUEST_START
  }
}

export const requestCompleted = () => {
  return {
    type: actionType.G_REQUEST_COMPLETED
  }
}
