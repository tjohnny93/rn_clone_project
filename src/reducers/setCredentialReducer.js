import { TOKEN } from '../actions/';

const initialState = '';

export const setCredentialReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOKEN:
      // console.log('reducer', action.payload);
      state = action.payload;
      return state;
    // return action.payload;
    default:
      return state;
  }
};
