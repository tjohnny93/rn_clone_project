import { TOKEN } from '../actions/';

const initialState = '';

export const setCredentialReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOKEN:
      return action.payload;
    default:
      return state;
  }
};
