// import axios from 'axios';
// import base64 from 'base-64';
// import { spotify } from '../server';

export const TOKEN = 'TOKEN';

export const fetchToken = localToken => {
  return {
    type: TOKEN,
    payload: localToken,
  };
};

// export const fetchToken = async () => {
//   await axios('https://accounts.spotify.com/api/token', {
//     headers: {
//       'Content-Type': 'application/x-www-form-urlencoded',
//       Authorization:
//         'Basic ' + base64.encode(spotify.ClientId + ':' + spotify.ClientSecret),
//     },
//     data: 'grant_type=client_credentials',
//     method: 'POST',
//   }).then(tokenResponse => {
//     console.log('action >>>', tokenResponse.data.access_token);
//     return {
//       type: TOKEN,
//       payload: tokenResponse.data.access_token,
//     };
//   });
// };
