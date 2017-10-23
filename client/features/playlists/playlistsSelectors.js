import { createSelector } from 'reselect';
import { getPlaylistsEntities } from 'features/entities/entitiesSelectors';

export const getPlaylistsState = state => state.playlists;

export const getPlaylistIds = createSelector(getPlaylistsState, state => state.playlistIds);

// Get the actual playlists objects by playlistIds
// export const getPlaylists = createSelector(
//   getPlaylistIds,
//   getPlaylistsEntities,
//   (playlistIds, playlistsById) => playlistIds.map(playlistId => playlistsById[String(playlistId)]),
// );

export const getPlaylists = state => {
  const playlistIds = getPlaylistIds(state);
  const playlistsById = getPlaylistsEntities(state);
  return playlistIds.map(id => playlistsById[id]);
};
