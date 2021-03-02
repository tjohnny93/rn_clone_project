import { NEXT_MUSIC } from '../actions/currentMusic';
import { CURRENT_PLAYLIST } from '../actions/currentMusic';

const initialState = {
  currentMusic: {},
  playList: [],
};

export const setMusicReducer = (state = initialState, action) => {
  switch (action.type) {
    case CURRENT_PLAYLIST:
      console.log(state.currentMusic?.track?.name);
      return {
        ...state,
        playList: action.payload.slice(1),
        currentMusic: action.payload[0],
      };
    case NEXT_MUSIC:
      console.log(state.currentMusic?.track?.name);
      return {
        ...state,
        currentMusic: state.playList[0],
        playList: state.slice(1),
      };
    default:
      return state;
  }
};
