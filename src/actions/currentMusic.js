export const NEXT_MUSIC = 'NEXT_MUSIC';
export const CURRENT_PLAYLIST = 'CURRENT_PLAYLIST';

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
