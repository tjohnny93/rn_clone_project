import { startDetecting } from 'react-native/Libraries/Utilities/PixelRatio';
import {
  IS_PLAYING,
  NEXT_MUSIC,
  TOGGLE_PLAY,
  SET_BAR_STATUS,
  PREV_MUSIC,
  ADD_LIKED,
  REMOVE_LIKED,
} from '../actions/currentMusic';
import { CURRENT_PLAYLIST } from '../actions/currentMusic';

const initialState = {
  currentMusic: { id: null },
  playList: [{}],
  currentIndex: null,
  isPlaying: false,
  listTitle: '',
  barStatus: 0,
  playButton: false,
  positionMillis: 0,
  durationMillis: 0,
  likedList: [],
};

export const setMusicReducer = (state = initialState, action) => {
  switch (action.type) {
    case CURRENT_PLAYLIST:
      return {
        ...state,
        currentMusic: action.payload[action.index],
        playList: action.payload,
        currentIndex: action.index,
        listTitle: action.listTitle,
      };
    case NEXT_MUSIC:
      return {
        ...state,
        currentIndex: state.currentIndex + 1,
        currentMusic: state.playList[state.currentIndex + 1],
      };
    case PREV_MUSIC:
      return {
        ...state,
        currentIndex: state.currentIndex - 1,
        currentMusic: state.playList[state.currentIndex - 1],
      };
    case IS_PLAYING:
      return {
        ...state,
        isPlaying: action.payload,
      };
    case TOGGLE_PLAY:
      return {
        ...state,
        playButton: !state.playButton,
        // isPlaying: !state.isPlaying,
      };
    case SET_BAR_STATUS:
      return {
        ...state,
        barStatus: action.payload.barStatus,
        positionMillis: action.payload.positionMillis,
        durationMillis: action.payload.durationMillis,
      };
    case ADD_LIKED:
      return {
        ...state,
        likedList: [...state.likedList, action.payload],
      };
    case REMOVE_LIKED:
      return {
        ...state,
        likedList: state.likedList.filter(ele => ele !== action.payload),
      };
    default:
      return state;
  }
};
