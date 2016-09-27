import axios from 'axios';
import { CLIENT_ID } from '../constants/Config';
import { concatParamsToUrl, formatGenre } from '../utils/FormatUtils';
import { normalizeCharts } from '../utils/NormalizeUtils';

export const SC_API_V2 = 'http://localhost:3001/sc/api-v2';

export function fetchCharts(genre) {
  let fetchUrl = `${SC_API_V2}/charts`;
  const formattedGenre = formatGenre(genre);
  // console.log(formattedGenre);
  const params = {
    kind: 'top',
    genre: `soundcloud:genres:${formattedGenre}`,
    offset: 0,
    limit: 50,
    client_id: CLIENT_ID
  };

  console.log(params.genre);

  fetchUrl = concatParamsToUrl(fetchUrl, params);

  return axios.get(fetchUrl).then((res) => {
    // console.log(res.data);
    const normalizedTracks = normalizeCharts(res.data);
    // console.log(normalizedTracks);
    return normalizedTracks;
  });
}
//
// yield put(actions.requestSongs(playlist));
// const response = yield call(axios.get, url);
// const normalizedSongs = yield call(normalize, response.data.collection, arrayOfSongs);
// yield put(actions.receiveSongs(
//     playlist,
//     normalizedSongs.entities.songs,
//     normalizedSongs.result,
//     response.data.next_href));
