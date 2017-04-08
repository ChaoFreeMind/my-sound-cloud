import { createSelector } from 'reselect';
import { shuffle } from 'lodash';

import { isInShuffleMode } from 'client/redux/modules/player/selectors';

/* Selectors */
export const getPlaylistState = state => state.playlist;
export const isPlaylistHidden = state => getPlaylistState(state).hidden;
export const getActivePlaylistName = state => getPlaylistState(state).activePlaylistName;
export const getVisiblePlaylistName = state => getVisiblePlaylistName(state).visiblePlaylistName;
export const getShuffleDraw = state => getPlaylistState(state).shuffleDraw;
export const getShufflePlayed = state => getPlaylistState(state).shufflePlayed;

export const getActivePlaylist = (state) => {
  const key = getActivePlaylistName(state);
  const playlistState = getPlaylistState(state);
  return playlistState[key];
};

// Whenever the activePlaylist changes, shuffle the playlist.
// export const getShufflePlaylist = createSelector(
//   getActivePlaylist,
//   playlist => shuffle(playlist),
// );

/* Old shuffle implementation, concise but hard to manipulate */
export const getShufflePlaylist = state => shuffle(getActivePlaylist(state));

// If under shuffle mode, return the shuffled playlist, else return the activePlaylist
export const getPlaylistByMode = (state) => {
  const inShuffleMode = isInShuffleMode(state);
  const shufflePlaylist = getShufflePlaylist(state);
  return inShuffleMode ? shufflePlaylist : getActivePlaylist(state);
};

