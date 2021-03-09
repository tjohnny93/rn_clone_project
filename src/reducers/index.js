import { combineReducers } from 'redux';
import { setCredentialReducer } from './setCredentialReducer';
import { setLikedReducer } from './setLikedReducer';
import { setMusicReducer } from './setMusicReducer';

const rootReducer = combineReducers({
  setCredential: setCredentialReducer,
  setMusic: setMusicReducer,
  setLiked: setLikedReducer,
});

export default rootReducer;
