/**
 *
 * PlayerCard
 *
 */
import React, { memo } from 'react';
import styled from 'styled-components/macro';
import { useTranslation } from 'react-i18next';
import { PlayerOverview } from 'types/PlayerOverview';
import { Link } from 'react-router-dom';
import { Stats } from '../Stats';

interface Props {
  player: PlayerOverview;
}

export const PlayerCard = memo(({ player }: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();

  const getStats = () => {
    return player.stats ? <Stats stats={player.stats} /> : 'No stats available';
  };

  return (
    <>
      <Card>
        <div>{player.id}</div>
        <div>{player.platform}</div>
        <Link to={`/details/${player.platform}/${player.id}`}>Detail</Link>
        <hr />
        {player.isLoading ? (
          'Loading...'
        ) : (
          <>
            <img src={player.avatarUrl} alt="Player's avatar" height="80px" />
            <div>{getStats()}</div>
          </>
        )}
      </Card>
    </>
  );
});

const Card = styled.div`
  border: 1px solid white;
  margin: 10px;
  padding: 10px;
`;
