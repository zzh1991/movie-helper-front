import { ActionTypes } from './actionTypes';

export const syncRecentMovies = () => {
  return {
    type: ActionTypes.SYNC_MOVIE_RECENT_REQUEST,
  };
};

export const syncTopMovies = () => {
  return {
    type: ActionTypes.SYNC_MOVIE_TOP_REQUEST,
  };
};
