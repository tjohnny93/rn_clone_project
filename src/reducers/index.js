import { combineReducers } from 'redux';
import { setCredentialReducer } from './setCredentialReducer';
import { setMusicReducer } from './setMusicReducer';

const rootReducer = combineReducers({
  setCredential: setCredentialReducer,
  setMusic: setMusicReducer,
});

export default rootReducer;
