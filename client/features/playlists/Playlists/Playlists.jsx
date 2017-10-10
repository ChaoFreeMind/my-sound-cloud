import React from 'react';
import Playlist from 'features/playlists/Playlist';
import { connect } from 'react-redux';
import { loadPlaylists, resetPlaylistsState } from 'features/playlists/playlistsActions';
import { getPlaylistIds } from 'features/playlists/playlistsSelectors';
import Wrapper from './Wrapper';

class Playlists extends React.Component {
  componentDidMount() {
    this.props.loadPlaylists();
  }

  componentWillUnmount() {
    this.props.resetPlaylistsState();
  }

  render() {
    const { playlistIds } = this.props;
    return (
      <Wrapper>
        {playlistIds.map(playlistId => <Playlist playlistId={playlistId} key={playlistId} />)}
      </Wrapper>
    );
  }
}

function mapStateToProps(state) {
  return {
    playlistIds: getPlaylistIds(state),
  };
}

const actions = {
  loadPlaylists,
  resetPlaylistsState,
};

export default connect(mapStateToProps, actions)(Playlists);