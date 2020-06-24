import { takeEvery, call, put } from 'redux-saga/effects';
import { request } from 'utils/request';
import { serverBaseUrl, createConfig } from 'utils/api';
import { actions } from './slice';
import { PlatformEnum } from 'types/PlatformEnum';
import { PlayerOverview } from 'types/PlayerOverview';
import { Stat } from 'types/Stat';

export function* getPlayerOverview(action) {
  const id: string = action.payload.id;
  const platform: PlatformEnum = action.payload.platform;

  // Get API info
  const requestURL = `${serverBaseUrl}/profile/${platform}/${id}`;
  const options = createConfig();

  try {
    // Call utils/request
    // TODO replace any
    const dto: any = yield call(request, requestURL, options);
    if (dto) {
      const playerOverviewFound = playerDtoToPlayerOverview(id, platform, dto);
      yield put(actions.foundPlayerOverview(playerOverviewFound));
    }
  } catch (err) {
    alert(err);
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* browsePageSaga() {
  // Watches if a player is added and calls getPlayerOverview
  yield takeEvery(actions.loadPlayerOverview.type, getPlayerOverview);
}

function playerDtoToPlayerOverview(
  id: string,
  platform: PlatformEnum,
  dto: any,
): PlayerOverview {
  return {
    id,
    platform,
    avatarUrl: dto?.platformInfo?.avatarUrl,
    isLoading: false,
    stats: getStatFromDto(dto),
  };
}

function getStatFromDto(dto): Stat[] {
  const rawStats = dto.segments[0].stats;
  const stats = Object.keys(rawStats).map(key => ({
    name: key,
    value: rawStats[key].displayValue,
  }));
  return stats;
}
