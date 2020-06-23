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
import { selectPlayers } from './selectors';
import { browsePageSaga } from './saga';
import { Player } from 'types/Player';
import { SearchForm } from '../SearchForm';
import { PlayerCard } from '../PlayerCard';

interface Props {}

export const BrowsePage = memo((props: Props) => {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: browsePageSaga });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();

  const players = useSelector(selectPlayers);
  const dispatch = useDispatch();

  const addPlayer = (p: Player) => {
    dispatch(actions.addPlayer(p));
  };

  return (
    <>
      <Helmet>
        <title>BrowsePage</title>
        <meta name="description" content="Description of BrowsePage" />
      </Helmet>
      <Div>BrowsePage</Div>
      <SearchForm onAddPlayer={addPlayer} />
      <hr />
      <h1>Players</h1>
      {players.map((p: Player) => (
        <PlayerCard key={p.id} player={p} />
      ))}
    </>
  );
});

const Div = styled.div``;
