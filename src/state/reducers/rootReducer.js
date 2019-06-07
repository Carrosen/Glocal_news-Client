import { combineReducers } from 'redux'
import { reduxTokenAuthReducer } from 'redux-token-auth'
import { locationReducer } from './locationReducer'

const rootReducer = combineReducers({
  reduxTokenAuth: reduxTokenAuthReducer,
  country: locationReducer
})

export default rootReducer
