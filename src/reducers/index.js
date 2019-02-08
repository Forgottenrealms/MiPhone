import { combineReducers } from 'redux'

import shelf from './shelf'
import user from './user'
import global from './global'

export default combineReducers({
    shelf,
    user,
    global
})