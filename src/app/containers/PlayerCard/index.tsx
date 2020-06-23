/**
 *
 * PlayerCard
 *
 */

import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components/macro';

import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { reducer, sliceKey } from './slice';
import { selectPlayerCard } from './selectors';
import { playerCardSaga } from './saga';
import { Player } from 'types/Player';

interface Props {
  player: Player;
}

export const PlayerCard = memo(({ player }: Props) => {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: playerCardSaga });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const playerCard = useSelector(selectPlayerCard);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const dispatch = useDispatch();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();

  return (
    <>
      <Card>
        <div>{player.id}</div>
        <div>{player.platform}</div>
        <hr />
        Loading
      </Card>
    </>
  );
});

const Card = styled.div`
  border: 1px solid white;
  margin: 10px;
  padding: 10px;
`;
