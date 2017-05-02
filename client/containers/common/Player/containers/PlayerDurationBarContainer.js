import { connect } from 'react-redux';
import { computeNewTimeOnSeek } from 'client/utils/PlayerUtils';

import {
  beginSeek,
  updateTimeOnSeek,
  updateTimeAndEndSeek,
} from 'client/redux/modules/player/actions';
import { getCurrentTime, isPlayerSeeking } from 'client/redux/modules/player/selectors';

import PlayerDurationBar from '../components/PlayerDurationBar';

const mapStateToProps = (state, { playerTrack }) => ({
  seeking: isPlayerSeeking(state),
  currentTime: getCurrentTime(state),
  duration: playerTrack.duration / 1000.0, // Extract a formatDuration util. convertMsToSec.
});

const mapDispatchToProps = dispatch => ({
  onDurationHandleMouseDown: () => {
    dispatch(beginSeek());
  },

  onDurationHandleMouseMove: (seekBar, duration, e) => {
    const newTime = computeNewTimeOnSeek(seekBar, duration, e);
    dispatch(updateTimeOnSeek(newTime));
  },

  onDurationBarMouseDown: () => {
    dispatch(beginSeek());
  },
  // Handle both seekbar handle mouse up and duration bar mouse up
  onMouseUp: (seekBar, duration, e) => {
    const newTime = computeNewTimeOnSeek(seekBar, duration, e);
    dispatch(updateTimeAndEndSeek(newTime));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PlayerDurationBar);