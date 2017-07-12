import * as types from './favoritesActionTypes.js';

const initialState = {
  fetching: false,
  nextHref: undefined,
};

export function startFetchingFavorites(state) {
  return {
    ...state,
    fetching: true,
  };
}

export function resetFavoritesState(state) {
  return {
    ...state,
  };
}

export function stopFetchingFavorites(state) {
  return {
    ...state,
    fetching: false,
  };
}

export function updateFavoritesNextHref(state, { nextHref }) {
  return {
    ...state,
    nextHref,
  };
}

export default function favoritesReducer(state = initialState, action) {
  switch (action.type) {
    case types.FAVORITES_FETCH_START:
      return startFetchingFavorites(state);

    case types.FAVORITES_NEXT_HREF_UPDATE:
      return updateFavoritesNextHref(state, action.payload);

    case types.FAVORITES_FETCH_STOP:
      return stopFetchingFavorites(state);

    case types.FAVORITES_STATE_RESET:
      return resetFavoritesState(initialState);

    default:
      return state;
  }
}
