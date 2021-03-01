import { combineReducers } from 'redux';
import { setCredentialReducer } from './setCredentialReducer';

const rootReducer = combineReducers({
  setCredential: setCredentialReducer,
});

export default rootReducer;
