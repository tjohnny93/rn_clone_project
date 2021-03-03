import { startDetecting } from 'react-native/Libraries/Utilities/PixelRatio';
import { IS_PLAYING, NEXT_MUSIC, TOGGLE_PLAY } from '../actions/currentMusic';
import { CURRENT_PLAYLIST } from '../actions/currentMusic';

const initialState = {
  currentMusic: { id: null },
  playList: [{}],
  currentIndex: null,
  isPlaying: false,
  playButton: false,
};

export const setMusicReducer = (state = initialState, action) => {
  switch (action.type) {
    case CURRENT_PLAYLIST:
      return {
        ...state,
        currentMusic: action.payload[action.index],
        playList: action.payload,
        currentIndex: action.index,
      };
    case NEXT_MUSIC:
      return {
        ...state,
        currentIndex: state.currentIndex + 1,
        currentMusic: state.playList[state.currentIndex + 1],
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
    default:
      return state;
  }
};
