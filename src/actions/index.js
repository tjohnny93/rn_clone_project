export const TOKEN = 'TOKEN';

export const fetchToken = localToken => {
  return {
    type: TOKEN,
    payload: localToken,
  };
};
