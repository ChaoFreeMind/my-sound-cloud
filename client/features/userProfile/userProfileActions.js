import { defaultWarning } from 'features/notification/notificationActions';
import { mergeEntities } from 'features/entities/entitiesActions';
import {
  showLoadingOverlay,
  hideLoadingOverlay,
} from 'features/loadingOverlay/loadingOverlayActions';
import { appendToPlayQueueIfNeeded } from 'features/playQueue/playQueueActions';

import * as types from './userProfileActionTypes';
import {
  getUserTracksNextHref,
  isUserTracksFetching,
  getProfiledUserId,
} from './userProfileSelectors';
import {
  fetchProfiledUser,
  fetchProfiledUserTracks,
  fetchMoreProfiledUserTracks,
} from './userProfileApi';

/* Action Creators */
export function startLoadingPage() {
  return {
    type: types.USER_PROFILE_PAGE_LOADING_START,
  };
}

export function stopLoadingPage() {
  return {
    type: types.USER_PROFILE_PAGE_LOADING_STOP,
  };
}

export function resetUserProfileState() {
  return {
    type: types.USER_PROFILE_STATE_RESET,
  };
}

export function startFetchingUser() {
  return { type: types.USER_PROFILE_USER_FETCH_START };
}

export function stopFetchingUser() {
  return { type: types.USER_PROFILE_USER_FETCH_STOP };
}

export function updateProfiledUserId(userId) {
  return {
    type: types.USER_PROFILE_USER_UPDATE,
    payload: {
      userId,
    },
  };
}

export function failedToFetchUser() {
  return { type: types.USER_PROFILE_USER_FAIL };
}

export function startFetchingTracks() {
  return { type: types.USER_PROFILE_TRACKS_FETCH_START };
}

export function stopFetchingTracks() {
  return { type: types.USER_PROFILE_TRACKS_FETCH_STOP };
}

export function updateTracksNextHref(nextHref) {
  return {
    type: types.USER_PROFILE_TRACKS_NEXT_HREF_UPDATE,
    payload: {
      nextHref,
    },
  };
}

export function failedToFetchUserTracks() {
  return {
    type: types.USER_PROFILE_TRACKS_FAIL,
  };
}

export function mergeUserProfileTracks(trackIds) {
  return {
    type: types.USER_PROFILE_TRACKS_MERGE,
    payload: {
      trackIds,
    },
  };
}

export function receiveUser(normalizedUser) {
  return (dispatch) => {
    dispatch(mergeEntities(normalizedUser.entities));
    dispatch(updateProfiledUserId(normalizedUser.result));
    dispatch(stopFetchingUser());
  };
}

export function receiveTracks(normalizedTracks) {
  return (dispatch, getState) => {
    const { result, entities, nextHref } = normalizedTracks;
    const state = getState();
    const userId = getProfiledUserId(state);
    dispatch(mergeEntities(entities));
    dispatch(mergeUserProfileTracks(result));
    dispatch(appendToPlayQueueIfNeeded(result, `user-${userId}`));
    dispatch(updateTracksNextHref(nextHref));
    dispatch(stopFetchingTracks());
  };
}

// Initial loading
export function loadUserProfileData(userId) {
  return (dispatch) => {
    dispatch(updateProfiledUserId(userId));
    // Right now the user fetching state does nothing... Consider removing it in the future
    dispatch(startFetchingUser());
    dispatch(startFetchingTracks());
    dispatch(showLoadingOverlay());
    Promise.all([fetchProfiledUser(userId), fetchProfiledUserTracks(userId)])
      .then((res) => {
        const normalizedUser = res[0];
        const normalizedTracks = res[1];
        dispatch(receiveUser(normalizedUser));
        dispatch(receiveTracks(normalizedTracks));
        dispatch(hideLoadingOverlay());
      })
      .catch((err) => {
        console.log(err);
        dispatch(defaultWarning());
      });
  };
}

export function loadMoreTracks() {
  return async (dispatch, getState) => {
    const state = getState();
    const fetching = isUserTracksFetching(state);

    // nextHref will be undefined if there is no more data to fetch
    const curNextHref = getUserTracksNextHref(state);
    if (!fetching && curNextHref) {
      try {
        dispatch(startFetchingTracks());
        const normalizedTracks = await fetchMoreProfiledUserTracks(curNextHref);
        dispatch(receiveTracks(normalizedTracks));
      } catch (err) {
        console.log(err);
        // dispatch(failedToFetchUserTracks());
        dispatch(defaultWarning());
      }
    }
  };
}
