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
} from './selectors';
import { browsePageSaga } from './saga';
import { PlatformType } from './types';

interface Props {}

export const BrowsePage = memo((props: Props) => {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: browsePageSaga });

  const playerIdSearched = useSelector(selectPlayerIdSearched);
  const platform = useSelector(selectPlatform);
  const playersFound = useSelector(selectPlayerFounds);
  const error = useSelector(selectError);
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
      <p>Result</p>
      <ul>
        {playersFound.map(p => (
          <li key={p.id}>
            <span>{p.id}</span>&nbsp;
            <span>{p.platform}</span>
            <button>Add</button>
          </li>
        ))}
      </ul>
      <p>Error:</p>
      <span>{error}</span>
    </>
  );
});

const Div = styled.div``;
