import axios from 'axios';
import { store } from '../../App';
import { instance } from '../config/server';

export const NEXT_MUSIC = 'NEXT_MUSIC';
export const CURRENT_PLAYLIST = 'CURRENT_PLAYLIST';
export const IS_PLAYING = 'IS_PLAYING';
export const TOGGLE_PLAY = 'TOGGLE_PLAY';
export const SET_BAR_STATUS = 'SET_BAR_STATUS';
export const PREV_MUSIC = 'PREV_MUSIC';
export const ADD_LIKED = 'ADD_LIKED';
export const REMOVE_LIKED = 'REMOVE_LIKED';
export const PLAY_MY_LIST = 'PLAY_MY_LIST';

export const setCurrentPlayList = (list, index, listTitle) => {
  return {
    type: CURRENT_PLAYLIST,
    payload: list,
    index: index,
    listTitle: listTitle,
  };
};

export const setNextMusic = () => {
  return {
    type: NEXT_MUSIC,
  };
};

export const setPrevMusic = () => {
  return {
    type: PREV_MUSIC,
  };
};

export const setStatus = boolean => {
  return {
    type: IS_PLAYING,
    payload: boolean,
  };
};

export const togglePlay = () => {
  return {
    type: TOGGLE_PLAY,
  };
};

export const setBarStatus = (barStatus, positionMillis, durationMillis) => {
  return {
    type: SET_BAR_STATUS,
    payload: { barStatus, positionMillis, durationMillis },
  };
};

// export const playMyList = (list, index, listTitle) => {
//   return {
//     type: PLAY_MY_LIST,
//     payload: list,
//     index: index,
//     listTitle: listTitle,
//   };
// };

export const getTracks = (id, listTitle) => async dispatch => {
  try {
    const res = await instance.get(`playlists/${id}/tracks`);
    // const res = await axios(
    //   `https://api.spotify.com/v1/playlists/${id}/tracks`,
    //   {
    //     method: 'GET',
    //     headers: {
    //       Authorization: 'Bearer ' + store.getState().setCredential,
    //     },
    //   }
    // );
    let randomIndex = Math.floor(
      Math.random() * Math.floor(res.data.items.length)
    );
    dispatch(setCurrentPlayList(res.data.items, randomIndex, listTitle));
  } catch (msg) {
    console.log(msg);
  }
};
