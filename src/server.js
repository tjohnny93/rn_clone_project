import axios from 'axios';
function spotifyCredentials() {
  return {
    ClientId: 'c27418ab27a24ffe94b0d40fc9772760',
    ClientSecret: '70906eccb97f4cc18b6afcfe4ff1bf2a',
  };
}

export const spotify = spotifyCredentials();

export const getToken = () => {
  axios();
};
