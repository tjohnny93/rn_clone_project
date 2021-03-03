export const NEXT_MUSIC = 'NEXT_MUSIC';
export const CURRENT_PLAYLIST = 'CURRENT_PLAYLIST';
export const IS_PLAYING = 'IS_PLAYING';
export const TOGGLE_PLAY = 'TOGGLE_PLAY';

export const setCurrentPlayList = (list, index) => {
  return {
    type: CURRENT_PLAYLIST,
    payload: list,
    index: index,
  };
};

export const setNextMusic = () => {
  return {
    type: NEXT_MUSIC,
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
