import { call, put, select, takeLatest } from 'redux-saga/effects';
import { selectPlayer } from './selectors';
import { Player } from 'types/Player';
import { actions } from './slice';
import { serverBaseUrl, createConfig } from 'utils/api';
import { request } from 'utils/request';
import { PlayerDetails, Segment } from './types';
import { Stat } from 'types/Stat';

export function* getPlayerDetail() {
  // Select playerIdSearched from store
  const player: Player = yield select(selectPlayer);
  if (player.id.length === 0 || player.platform.length === 0) {
    // Dispatch an action
    yield put(actions.errorPlayerDetails('url parameter issue'));
    return;
  }

  // Get API info
  const requestURL = `${serverBaseUrl}/profile/${player.platform}/${player.id}`;
  const options = createConfig();

  try {
    // Call utils/request
    const dto: any = yield call(request, requestURL, options);
    if (dto) {
      const playerDetails: PlayerDetails = playerDetailsDtoToPlayer(dto);
      console.log(playerDetails);
      yield put(actions.detailsLoaded(playerDetails));
    } else {
      yield put(actions.errorPlayerDetails('Not found'));
    }
  } catch (err) {
    yield put(actions.errorPlayerDetails(err.message));
  }
}

export function* detailsPageSaga() {
  yield takeLatest(actions.loadDetails.type, getPlayerDetail);
}

function playerDetailsDtoToPlayer(dto): PlayerDetails {
  return {
    id: dto.platformInfo.platformUserIdentifier,
    platform: dto.platformInfo.platformSlug,
    avatarUrl: dto.platformInfo?.avatarUrl,
    isLoading: false,
    stats: getStats(dto.segments[0].stats),
    countryCode: dto.userInfo.countryCode,
    activeLegend: dto.metadata.activeLegendName,
    segments: getSegments(dto.segments.slice(1, dto.segments.length)), // remove overview segment
  };
}

function getStats(overviewDto): Stat[] {
  const stats = Object.keys(overviewDto).map(key => ({
    name: key,
    value: overviewDto[key].displayValue,
  }));
  return stats;
}

function getSegments(segmentsDto: any): Segment[] {
  return segmentsDto.map(s => ({
    legend: s.metadata.name,
    imageUrl: s.metadata.imageUrl,
    tallImageUrl: s.metadata.tallImageUrl,
    bgImageUrl: s.metadata.bgImageUrl,
    stats: getStats(s.stats),
  }));
}
