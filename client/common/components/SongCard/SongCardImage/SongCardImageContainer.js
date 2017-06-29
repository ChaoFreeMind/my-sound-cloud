import { connect } from 'react-redux';
import { isTrackActive, isTrackPlaying } from 'features/player/playerSelectors';
import { changeSongAndPlay, playSong, pauseSong } from 'features/player/playerActions';
import { switchActivePlaylistIfNeeded } from 'features/playlist/playlistActions';
import { getLargeVersion } from 'common/utils/imageUtils';
import { getUserById } from 'features/entities/entitiesSelectors';
import SongCardImage from './SongCardImage';

function mapStateToProps(state, { track }) {
  const user = getUserById(state, track.userId);
  return {
    artworkUrl: getLargeVersion(track.artworkUrl || user.avatarUrl),
    active: isTrackActive(state, track.id),
    playing: isTrackPlaying(state, track.id),
  };
}

// This is useful when you need to compute some action using stateProps
function mergeProps(stateProps, { dispatch }, { track }) {
  return {
    ...stateProps,
    // Besides doing it this way, we could also do it in a thunk function
    // or pass all args into components and assemble there
    handleImageClick() {
      if (!stateProps.active) {
        // Change song first and then switch active playlist
        dispatch(changeSongAndPlay(track.id));
        dispatch(switchActivePlaylistIfNeeded());
      } else {
        dispatch(stateProps.playing ? pauseSong() : playSong());
      }
    },
  };
}

export default connect(mapStateToProps, null, mergeProps)(SongCardImage);
