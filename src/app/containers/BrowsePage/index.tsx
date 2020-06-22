/**
 *
 * BrowsePage
 *
 */

import React, { memo } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components/macro';

import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { reducer, sliceKey, actions } from './slice';
import {
  selectPlayerIdSearched,
  selectPlayerFounds,
  selectError,
  selectPlatform,
  selectPlayers,
} from './selectors';
import { browsePageSaga } from './saga';
import { PlatformType, PlayerErrorType, Player } from './types';

interface Props {}

export const BrowsePage = memo((props: Props) => {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: browsePageSaga });

  const playerIdSearched = useSelector(selectPlayerIdSearched);
  const platform = useSelector(selectPlatform);
  const playersFound = useSelector(selectPlayerFounds);
  const error = useSelector(selectError);
  const players = useSelector(selectPlayers);
  const dispatch = useDispatch();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();

  const onSearch = () => {
    dispatch(actions.browsePlayers());
  };

  const onChangePlayerIdSearched = (e: React.FormEvent<HTMLInputElement>) => {
    dispatch(actions.setPlayerId(e.currentTarget.value));
  };

  const onChangePlatform = (e: React.FormEvent<HTMLInputElement>) => {
    dispatch(actions.setPlatform(e.currentTarget.value as PlatformType));
  };

  const onAddPlayer = (p: Player) => {
    dispatch(actions.addPlayer(p));
  };

  const platforms = Object.values(PlatformType);
  return (
    <>
      <Helmet>
        <title>BrowsePage</title>
        <meta name="description" content="Description of BrowsePage" />
      </Helmet>
      <Div>BrowsePage</Div>
      <input
        value={playerIdSearched}
        onChange={onChangePlayerIdSearched}
      ></input>
      {platforms.map(p => (
        <label key={p}>
          <input
            type="radio"
            value={p}
            checked={p === platform}
            onChange={onChangePlatform}
          />
          {p}
        </label>
      ))}
      <button onClick={onSearch}>Search</button>
      <div>
        {playersFound?.length > 0 ? (
          <ul>
            {playersFound.map(p => (
              <li key={p.id}>
                <span>{p.id}</span>&nbsp;
                <span>{p.platform}</span>
                <button onClick={() => onAddPlayer(p)}>Add</button>
              </li>
            ))}
          </ul>
        ) : error ? (
          <span>{errorText(error)}</span>
        ) : null}
      </div>
      <hr />
      <h1>Players</h1>
      {players.map(p => (
        <p key={p.id}>{p.id}</p>
      ))}
    </>
  );
});

export const errorText = (error: PlayerErrorType) => {
  switch (error) {
    case PlayerErrorType.PLAYERS_NOT_FOUND:
      return 'There is no Apex player with this id';
    case PlayerErrorType.PLAYER_ID_EMPTY:
      return 'Type any player id';
    case PlayerErrorType.APEX_API_RATE_LIMIT:
      return 'Apex api is limited to 30 requests per minute';
    default:
      return 'An error has occurred!';
  }
};

const Div = styled.div``;
