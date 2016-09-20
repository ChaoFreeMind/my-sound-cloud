import { fork, put, call, select } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';
import * as ActionTypes from '../constants/ActionTypes';
import { generateFetchUrl } from '../utils/SongUtils';
import axios from 'axios';
import { normalize } from 'normalizr';
import { arrayOfSongs } from '../actions/schema';
import { requestSongs, receiveSongs } from '../actions/playlists';
import { changeVisiblePlaylist } from '../actions/visiblePlaylist';
import { changeSong, playSong, loadPlayerPlaylist, updateTime } from '../actions/player';
import {
  getPlaylists,
  getVisiblePlaylistName,
  getNextUrlOfVisiblePlaylist,
  getPlayerPlaylistName
} from '../reducers';

/******************************************************************************/
/******************************* SUBROUTINES **********************************/
/******************************************************************************/

function* doFetchSongs(playlist, url) {
  yield put(requestSongs(playlist));
  const response = yield call(axios.get, url);
  const normalizedSongs = yield call(normalize, response.data.collection, arrayOfSongs);
  yield put(receiveSongs(
      playlist,
      normalizedSongs.entities.songs,
      normalizedSongs.result,
      response.data.next_href));
}

// Initial loading
function* loadSongCardsPage({ payload }) {
  const playlist = payload;
  // 1.Change visiblePlaylistName
  yield put(changeVisiblePlaylist(playlist));
  const playlists = yield select(getPlaylists);
  // 2.Load songs if not cached
  const url = yield call(generateFetchUrl, playlist);
  if (!(playlist in playlists)) {
    yield fork(doFetchSongs, playlist, url);
  }
}

// Scroll loading
function* loadMoreSongsOnScroll() {
    const nextUrl = yield select(getNextUrlOfVisiblePlaylist);
    const playlist = yield select(getVisiblePlaylistName);
    const playlists = yield select(getPlaylists);
    if ((playlist in playlists) && (!playlists[playlist].isFetching)
     && (playlists[playlist].nextUrl !== null)) {
       yield fork(doFetchSongs, playlist, nextUrl);
    }
}

// Change to new song or just play paused current song.
function* changeSongAndPlay({ payload }) {
  const newSongId = payload;
  const visiblePlaylistName = yield select(getVisiblePlaylistName);
  const playerPlaylistName = yield select(getPlayerPlaylistName);
  if (visiblePlaylistName !== playerPlaylistName) {
    yield put(loadPlayerPlaylist(visiblePlaylistName));
  }
  yield put(updateTime(0));
  yield put(changeSong(newSongId));
  yield put(playSong());
}

/******************************************************************************/
/******************************* WATCHERS *************************************/
/******************************************************************************/

export function* watchLoadSongCardsPage() {
  yield takeEvery(ActionTypes.LOAD_SONG_CARDS_PAGE, loadSongCardsPage); // We can use takeLatest interchangeably
}

export function* watchLoadMoreSongsOnScroll() {
  yield takeEvery(ActionTypes.LOAD_MORE_SONGS_ON_SCROLL, loadMoreSongsOnScroll);
}

export function* watchChangeSongAndPlay() {
  yield takeEvery(ActionTypes.CHANGE_SONG_AND_PLAY, changeSongAndPlay);
}
