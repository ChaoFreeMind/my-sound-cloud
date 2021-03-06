import * as trackApi from '../common/soundcloud/v1/track';
import * as trackApiV2 from '../common/soundcloud/v2/track';
import { getPaginatedResult } from '../common/helpers/repository';

export async function getTrackById(trackId: number) {
  return trackApi.getTrackById(trackId);
}

export async function getCharts(genre: string, offset: number, limit: number) {
  const result = await trackApiV2.getCharts(genre, offset, limit);

  return getPaginatedResult(result, ({ track }) => track);
}
