import { NEXT_MUSIC } from '../actions/currentMusic';
import { CURRENT_PLAYLIST } from '../actions/currentMusic';

const initialState = {
  currentMusic: { empty: 'placeholder' },
  playList: [{}],
  currentIndex: null,
};

export const setMusicReducer = (state = initialState, action) => {
  switch (action.type) {
    case CURRENT_PLAYLIST:
      return {
        ...state,
        playList: action.payload,
        currentIndex: action.index,
      };
    case NEXT_MUSIC:
      return {
        ...state,
        currentIndex: state.currentIndex + 1,
      };
    default:
      return state;
  }
};
