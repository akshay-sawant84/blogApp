import {combineReducers} from 'redux'
import authReducer from './Auth/authReducer'

export default combineReducers({
   auth : authReducer
})