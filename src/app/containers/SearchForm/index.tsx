/**
 *
 * SearchForm
 *
 */

import React, { memo } from 'react';
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
  selectLoading,
} from './selectors';
import { searchFormSaga } from './saga';
import { PlatformEnum } from 'types/PlatformEnum';
import { PlayerErrorType } from './types';
import { Player } from 'types/Player';

interface Props {
  onAddPlayer: (p: Player) => void;
}

export const SearchForm = memo(({ onAddPlayer }: Props) => {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: searchFormSaga });
  const dispatch = useDispatch();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();

  const playerIdSearched = useSelector(selectPlayerIdSearched);
  const platform = useSelector(selectPlatform);
  const playersFound = useSelector(selectPlayerFounds);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const onSearch = () => {
    dispatch(actions.browsePlayers());
  };

  const onChangePlayerIdSearched = (e: React.FormEvent<HTMLInputElement>) => {
    dispatch(actions.setPlayerId(e.currentTarget.value));
  };

  const onChangePlatform = (e: React.FormEvent<HTMLInputElement>) => {
    dispatch(actions.setPlatform(e.currentTarget.value as PlatformEnum));
  };

  const addPlayer = (p: Player) => {
    onAddPlayer(p);
    dispatch(actions.setPlayerId(''));
    dispatch(actions.foundPlayers([]));
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    onSearch();
  };

  const platforms = Object.values(PlatformEnum);
  return (
    <>
      <Form onSubmit={handleSubmit}>
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
        <button type="submit">Search</button>
        {loading && <span>Loading...</span>}
      </Form>
      <Result>
        {playersFound?.length > 0 ? (
          <ul>
            {playersFound.map(p => (
              <li key={p.id}>
                <span>{p.id}</span>&nbsp;
                <span>{p.platform}</span>
                <button onClick={() => addPlayer(p)}>Add</button>
              </li>
            ))}
          </ul>
        ) : error ? (
          <span>{errorText(error)}</span>
        ) : null}
      </Result>
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

const Form = styled.form``;
const Result = styled.div``;
