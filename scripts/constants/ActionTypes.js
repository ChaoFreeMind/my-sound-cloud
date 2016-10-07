/* Player Action Types */
export const TOGGLE_PLAYLIST = 'TOGGLE_PLAYLIST';
export const REQUEST_SONGS = 'REQUEST_SONGS';
export const RECEIVE_SONGS = 'RECEIVE_SONGS';
export const PLAY_SONG = 'PLAY_SONG';
export const PAUSE_SONG = 'PAUSE_SONG';
export const UPDATE_TIME = 'UPDATE_TIME';
export const LOAD_PLAYER_PLAYLIST = 'LOAD_PLAYER_PLAYLIST';

export const CHANGE_SONG = 'CHANGE_SONG';
export const BEGIN_SEEK = 'BEGIN_SEEK';
export const END_SEEK = 'END_SEEK';
export const CHANGE_DURATION = 'CHANGE_DURATION';
export const CHANGE_VOLUME = 'CHANGE_VOLUME';
export const BEGIN_VOLUME_SEEK = 'BEGIN_VOLUME_SEEK';
export const END_VOLUME_SEEK = 'END_VOLUME_SEEK';
export const CHANGE_PLAY_MODE = 'CHANGE_PLAY_MODE';
export const CHANGE_VISIBLE_PLAYLIST = 'CHANGE_VISIBLE_PLAYLIST';

/* Playlists Saga Action Types */
export const SAGA_LOAD_SONG_CARDS_PAGE = 'SAGA_LOAD_SONG_CARDS_PAGE';
export const SAGA_LOAD_MORE_SONGS_ON_SCROLL = 'SAGA_LOAD_MORE_SONGS_ON_SCROLL';

/* Player Saga Action Types*/
export const SAGA_CHANGE_SONG_AND_PLAY = 'SAGA_CHANGE_SONG_AND_PLAY';
export const SAGA_UPDATE_TIME_ON_PLAY = 'SAGA_UPDATE_TIME_ON_PLAY';
export const SAGA_UPDATE_TIME_ON_SEEK = 'SAGA_UPDATE_TIME_ON_SEEK';
export const SAGA_UPDATE_TIME_AND_END_SEEK = 'SAGA_UPDATE_TIME_AND_END_SEEK';
export const SAGA_UPDATE_VOLUME_AND_END_SEEK = 'SAGA_UPDATE_VOLUME_AND_END_SEEK';
export const SAGA_TOGGLE_MUTE = 'SAGA_TOGGLE_MUTE';

export const SAGA_PLAY_NEXT_SONG = 'SAGA_PLAY_NEXT_SONG';
export const SAGA_PLAY_PREV_SONG = 'SAGA_PLAY_PREV_SONG';
export const SAGA_CHANGE_PLAY_MODE = 'SAGA_CHANGE_PLAY_MODE';

export const MUTE = 'MUTE';
export const CLEAR_TIME = 'CLEAR_TIME';
export const SEARCH_SONGS = 'SEARCH_SONGS';
export const INIT_SHUFFLE = 'INIT_SHUFFLE';
export const SHUFFLE_DRAW = 'SHUFFLE_DRAW';
export const SHUFFLE_DISCARD = 'SHUFFLE_DISCARD';

/* User Action Types */
export const LIKE_SONG_SUCCESS = 'LIKE_SONG_SUCCESS';
export const LIKE_SONG_FAILED = 'LIKE_SONG_FAILED';
export const UNLIKE_SONG_SUCCESS = 'UNLIKE_SONG_SUCCESS';
export const UNLIKE_SONG_FAILED = 'UNLIKE_SONG_FAILED';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const LOGOUT = 'LOGOUT';
export const LOAD_ALL_LIKES = 'LOAD_ALL_LIKES';

/* Search Action Types */
export const START_SEARCH = 'START_SEARCH';
export const END_SEARCH = 'END_SEARCH';
export const SEARCH_USERS_RECEIVED = 'SEARCH_USERS_RECEIVED';
export const SEARCH_TRACKS_RECEIVED = 'SEARCH_TRACKS_RECEIVED';
export const SHOW_SEARCH_RESULTS = 'SHOW_SEARCH_RESULTS';
export const HIDE_SEARCH_RESULTS = 'HIDE_SEARCH_RESULTS';
export const CLEAR_SEARCH_RESULTS = 'CLEAR_SEARCH_RESULTS';
