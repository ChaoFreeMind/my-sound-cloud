import React, { PropTypes } from 'react';
import PlaylistItemContainer from '../containers/PlaylistItemContainer';

const Playlist = ({
  playerPlaylistSongs,
  isPlaylistShown
 }) => {
  return (
    <div className={`col-sm-2 playlist ${isPlaylistShown ? 'show' : ''}`} >
      <div className="playlist-container">
        <div className="playlist-title">
          <span className="labelColumn">TRACKS</span>
          |
          <span className="labelColumn">ARTIST</span>
        </div>
        <ul className="playlist-list">
          {
            playerPlaylistSongs.map(
              (song, idx) => <PlaylistItemContainer song={song} index={idx + 1} key={idx} />
            )
          }
        </ul>
      </div>
    </div>
  );
};

Playlist.propTypes = {
  isPlaylistShown: PropTypes.bool,
  playerPlaylistSongs: PropTypes.array
};

export default Playlist;
// ${(isPlaylistShown ? '' : 'hide')}
