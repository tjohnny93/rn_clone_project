export const NEXT_MUSIC = 'NEXT_MUSIC';
export const CURRENT_PLAYLIST = 'CURRENT_PLAYLIST';

export const setNextMusic = () => {
  return {
    type: NEXT_MUSIC,
  };
};

export const setCurrentPlayList = list => {
  return {
    type: CURRENT_PLAYLIST,
    payload: list,
  };
};
