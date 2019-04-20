import { call, put, takeLatest } from 'redux-saga/effects';
import Api from '../services/api';
import { ActionTypes } from '../actions/actionTypes';
import {
  fetchMovieRecent,
  fetchMovieTop,
  fetchViewdMovieList,
  fetchStarMovieList,
  fetchAllMovieList,
} from '../actions/actions';

function* fetchMovieRecentSage() {
  try {
    const payload = yield call(Api.fetchMovieRecent);
    yield put(fetchMovieRecent.success(payload));
  } catch (error) {
    yield put(fetchMovieRecent.error(error.message));
  }
}

function* fetchMovieTopSage() {
  try {
    const payload = yield call(Api.fetchMovieTop);
    yield put(fetchMovieTop.success(payload));
  } catch (error) {
    yield put(fetchMovieTop.error(error.message));
  }
}

function* fetchViewedMovieListSage(action) {
  const request = action.data;
  try {
    const payload = yield call(Api.fetchViewedMovieList, request);
    yield put(fetchViewdMovieList.success(payload));
  } catch (error) {
    yield put(fetchViewdMovieList.error(error.message));
  }
}

function* fetchStarMovieListSage(action) {
  const request = action.data;
  try {
    const payload = yield call(Api.fetchStarMovieList, request);
    yield put(fetchStarMovieList.success(payload));
  } catch (error) {
    yield put(fetchStarMovieList.error(error.message));
  }
}

function* fetchAllMovieListSage() {
  try {
    const payload = yield call(Api.fetchAllMovieList);
    yield put(fetchAllMovieList.success(payload));
  } catch (error) {
    yield put(fetchAllMovieList.error(error.message));
  }
}

export default function* HelloSaga() {
  yield takeLatest(
    ActionTypes.FETCH_MOVIE_RECENT_REQUEST,
    fetchMovieRecentSage,
  );
  yield takeLatest(ActionTypes.FETCH_MOVIE_TOP_REQUEST, fetchMovieTopSage);
  yield takeLatest(
    ActionTypes.FETCH_VIEWED_MOVIE_LIST_REQUEST,
    fetchViewedMovieListSage,
  );
  yield takeLatest(
    ActionTypes.FETCH_STAR_MOVIE_LIST_REQUEST,
    fetchStarMovieListSage,
  );
  yield takeLatest(
    ActionTypes.FETCH_ALL_MOVIE_LIST_REQUEST,
    fetchAllMovieListSage,
  );
}
