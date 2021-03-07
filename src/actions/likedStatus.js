export const LIKE_PLAYLIST = 'LIKE_PLAYLIST';
export const UNLIKE_PLAYLIST = 'UNLIKE_PLAYLIST';
export const LIKE_TRACK = 'LIKE_TRACK';
export const UNLIKE_TRACK = 'REMOVE_TRACK';

export const likePlayList = id => {
  return {
    type: LIKE_PLAYLIST,
    payload: id,
  };
};

export const unLikePlayList = id => {
  return {
    type: UNLIKE_PLAYLIST,
    payload: id,
  };
};

export const likeTrack = id => {
  return {
    type: LIKE_TRACK,
    payload: id,
  };
};

export const unLikeTrack = id => {
  return {
    type: UNLIKE_TRACK,
    payload: id,
  };
};
