import { takeEvery, call, put, select, takeLatest } from 'redux-saga/effects';
import { request } from 'utils/request';
import { serverBaseUrl, createConfig } from 'utils/api';
import { actions } from './slice';
import { selectPlayerIdSearched, selectPlatform } from './selectors';
import {
  PlayerErrorType,
  PlatformType,
  Player,
  PlayerSearchDto,
} from './types';

export function* getPlayers() {
  // Select playerIdSearched from store
  const id: string = yield select(selectPlayerIdSearched);
  const platform: PlatformType = yield select(selectPlatform);
  if (id.length === 0) {
    // Dispatch an action
    yield put(actions.errorPlayers(PlayerErrorType.PLAYER_ID_EMPTY));
    return;
  }

  // Get API info
  const requestURL = `${serverBaseUrl}/search?platform=${platform}&query=${id}`;
  const options = createConfig();

  try {
    // Call utils/request
    const dtos: PlayerSearchDto[] = yield call(request, requestURL, options);
    if (dtos.length > 0) {
      const playersFound = dtos.map(dto => playerSearchDtoToPlayer(dto));
      yield put(actions.foundPlayers(playersFound));
    } else {
      yield put(actions.errorPlayers(PlayerErrorType.PLAYERS_NOT_FOUND));
    }
  } catch (err) {
    if (err.message === 'Too Many Requests') {
      yield put(actions.errorPlayers(PlayerErrorType.APEX_API_RATE_LIMIT));
    } else {
      yield put(actions.errorPlayers(PlayerErrorType.RESPONSE_ERROR));
    }
  }
}

// export function* getPlayerOverview(action) {
//   const id: string = action.payload.id;
//   const platform: string = action.payload.platform;

//   // Get API info
//   const requestURL = `${serverBaseUrl}/profile/${platform}/${id}`;
//   const options = createConfig();

//   try {
//     // Call utils/request
//     // TODO replace any
//     const dto: any = yield call(request, requestURL, options);

//   }
// }

/**
 * Root saga manages watcher lifecycle
 */
export function* browsePageSaga() {
  // Watches for browsePlayers actions and calls getPlayers when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(actions.browsePlayers.type, getPlayers);

  // Watches if a player is added and calls getPlayerOverview
  // yield takeEvery(actions.addPlayer.type, getPlayerOverview);
}

// Converting request from API
function playerSearchDtoToPlayer(playerSearchDto: PlayerSearchDto): Player {
  return {
    id: playerSearchDto.platformUserIdentifier,
    platform: playerSearchDto.platformSlug,
  };
}
