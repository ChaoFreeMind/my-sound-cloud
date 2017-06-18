import { trackArraySchema } from 'client/app/schema';
import { makeSCV2Request } from 'client/common/utils/apiUtils';
import { normalizeResponse } from 'client/common/utils/normalizeUtils';

// https://api-v2.soundcloud.com/charts?kind=top&genre=soundcloud%3Agenres%3Aall-music&linked_partitioning=1&limit=25&offset=0&client_id=f9e1e2232182a46705c880554a1011af

function transform(response) {
  return {
    ...response,
    collection: response.collection.map((item) => {
      switch (item.type) {
        case 'track-repost':
          return item.track;
        default:
          return null;
      }
    }),
  };
}

// https://api-v2.soundcloud.com/stream/users/250047142?client_id=2t9loNQH90kzJcsFCODdigxfp325aq4z&limit=10&offset=0&linked_partitioning=1&app_version=1497015478
export function fetchStream(userId, limit = 20) {
  const fetchUrl = `/stream/users/${userId}?limit=${limit}&offset=0&linked_partitioning=1`;
  return makeSCV2Request(fetchUrl)
    .then(transform)
    .then(transformed => normalizeResponse(transformed, trackArraySchema));
}

export function fetchMoreStream(nextHref) {
  return makeSCV2Request(nextHref)
    .then(transform)
    .then(transformed => normalizeResponse(transformed, trackArraySchema));
}