import { State } from 'react-native-gesture-handler';
import {
  LIKE_PLAYLIST,
  UNLIKE_PLAYLIST,
  LIKE_TRACK,
  UNLIKE_TRACK,
} from '../actions/likedStatus';

const initialState = {
  likedPlayList: [],
  likedTrack: [],
};

export const setLikedReducer = (state = initialState, action) => {
  switch (action.type) {
    case LIKE_PLAYLIST:
      return {
        ...state,
        likedPlayList: [...state.likedPlayList, action.payload],
      };
    case UNLIKE_PLAYLIST:
      return {
        ...state,
        likedPlayList: state.likedPlayList.filter(
          ele => ele !== action.payload
        ),
      };
    case LIKE_TRACK:
      return {
        ...state,
        likedTrack: [...state.likedTrack, action.payload],
      };
    case UNLIKE_TRACK:
      return {
        ...state,
        likedTrack: state.likedTrack.filter(ele => ele !== action.payload),
      };
    default:
      return state;
  }
};
