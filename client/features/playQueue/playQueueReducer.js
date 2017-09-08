import { mergeArrays } from 'common/utils/generalUtils';
import remove from 'lodash/remove';
import * as types from './playQueueActionTypes';

const initialState = {
  activePlayQueueName: undefined,
  visiblePlayQueueName: undefined,
  visiblePlayQueue: [],
  activePlayQueue: [],
  hidden: true,
  shuffledPlayQueue: [],
};

// not used??
export function appendVisiblePlayQueue(state, { newPlayQueue }) {
  return {
    ...state,
    visiblePlayQueue: [...state.visiblePlayQueue, ...newPlayQueue],
  };
}

// #TODO: also need to handle play queue shuffle
export function clearPlayQueue(state) {
  return {
    ...state,
    activePlayQueue: [],
  };
}

export function updateVisiblePlayQueue(state, { visiblePlayQueue }) {
  return {
    ...state,
    [state.visiblePlayQueueName]: [...visiblePlayQueue],
    visiblePlayQueue: [...visiblePlayQueue],
  };
}

export function updateShuffledPlayQueue(state, { shuffledPlayQueue }) {
  return {
    ...state,
    shuffledPlayQueue: [...shuffledPlayQueue],
  };
}

export function clearShufflePlayQueue(state) {
  return {
    ...state,
    shufflePlayQueue: [],
  };
}

export function updateVisiblePlayQueueName(state, { visiblePlayQueueName }) {
  return {
    ...state,
    visiblePlayQueueName,
  };
}

export function updateActivePlayQueueName(state, { activePlayQueueName }) {
  const newPlayQueue = state[activePlayQueueName];
  return {
    ...state,
    activePlayQueueName,
    activePlayQueue: [...newPlayQueue],
  };
}

export function updatePlayQueue(state, { playQueueName, trackIds }) {
  return {
    ...state,
    [playQueueName]: [...trackIds],
  };
}

export function appendToPlayQueue(state, { playQueueName, trackIds }) {
  const newPlayQueue = state[playQueueName]
    ? [...state[playQueueName], ...trackIds]
    : [...trackIds];
  return {
    ...state,
    [playQueueName]: newPlayQueue,
  };
}

export function mergePlayQueue(state, { playQueueName, trackIds }) {
  const curPlayQueue = state[playQueueName] ? state[playQueueName] : [];
  return {
    ...state,
    // There is order in merged array!!
    [playQueueName]: mergeArrays(curPlayQueue, trackIds),
  };
}

export function removePlayQueue(state, { playQueueName }) {
  const newState = { ...state };
  delete newState[playQueueName];
  return newState;
}

export function removeTrackFromPlayQueue(state, { trackId }) {
  const newActivePlayQueue = remove(state.activePlayQueue, item => item !== trackId);
  return {
    ...state,
    activePlayQueue: [...newActivePlayQueue],
  };
}

export function showPlayQueue(state) {
  return {
    ...state,
    hidden: false,
  };
}

export function hidePlayQueue(state) {
  return {
    ...state,
    hidden: true,
  };
}

export default function playQueueReducer(state = initialState, action) {
  switch (action.type) {
    case types.PLAY_QUEUE_SHOW:
      return showPlayQueue(state);

    case types.PLAY_QUEUE_HIDE:
      return hidePlayQueue(state);

    case types.PLAY_QUEUE_MERGE:
      return mergePlayQueue(state, action.payload);

    case types.PLAY_QUEUE_REMOVE:
      return removePlayQueue(state, action.payload);

    case types.PLAY_QUEUE_TRACK_REMOVE:
      return removeTrackFromPlayQueue(state, action.payload);

    case types.PLAY_QUEUE_SHUFFLE_PLAY_QUEUE_UPDATE:
      return updateShuffledPlayQueue(state, action.payload);

    case types.PLAY_QUEUE_SHUFFLE_PLAY_QUEUE_CLEAR:
      return clearShufflePlayQueue(state);

    // Need to handle shuffle mode!!
    case types.APPEND_TRACK_TO_PLAY_QUEUE:
      return appendToPlayQueue(state, action.payload);

    case types.PLAY_QUEUE_CLEAR:
      return clearPlayQueue(state, action.payload);

    case types.PLAY_QUEUE_VISIBLE_PLAY_QUEUE_NAME_CHANGE:
      return updateVisiblePlayQueueName(state, action.payload);

    case types.PLAY_QUEUE_ACTIVE_PLAY_QUEUE_NAME_CHANGE:
      return updateActivePlayQueueName(state, action.payload);

    default:
      return state;
  }
}