import { createSelector } from 'reselect';
import { getUsers as getAllUsers } from 'features/entities/entitiesSelectors';
import { getLargeVersion } from 'common/utils/imageUtils';

const getState = state => state.userProfile;

export const getProfiledUserId = createSelector(getState, state => state.userId);

export const getProfiledUser = createSelector(
  getAllUsers,
  getProfiledUserId,
  (users, userId) => userId && users[String(userId)],
);

export const getUserAvatarUrl = createSelector(
  getProfiledUser,
  user => user && getLargeVersion(user.avatarUrl),
);

export const getUserPermalinkUrl = createSelector(
  getProfiledUser,
  user => user && user.permalinkUrl,
);

export const getUsername = createSelector(getProfiledUser, user => user && user.username);

export const getUserDescription = createSelector(getProfiledUser, user => user && user.description);

export const getUserFollowersCount = createSelector(
  getProfiledUser,
  user => user && user.followersCount.toLocaleString(),
);

export const getProfiledUserTrackIds = createSelector(getState, state => state.trackIds);

export const isUserFetching = createSelector(getState, state => state.userFetching);

export const isUserTracksFetching = createSelector(getState, state => state.tracksFetching);

export const isPageLoading = createSelector(getState, state => state.pageLoading);

export const getUserTracksNextHref = createSelector(getState, state => state.tracksNextHref);
