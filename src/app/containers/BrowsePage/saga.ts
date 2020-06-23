// import { takeEvery, call, put, select, takeLatest } from 'redux-saga/effects';
// import { request } from 'utils/request';
// import { serverBaseUrl, createConfig } from 'utils/api';
// import { actions } from './slice';

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
  // Watches if a player is added and calls getPlayerOverview
  // yield takeEvery(actions.addPlayer.type, getPlayerOverview);
}
