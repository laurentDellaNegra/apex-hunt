/**
 *
 * PlayerCard
 *
 */
import React, { memo } from 'react';
import styled from 'styled-components/macro';
import { useTranslation } from 'react-i18next';
import { PlayerOverview } from 'types/PlayerOverview';

interface Props {
  player: PlayerOverview;
}

export const PlayerCard = memo(({ player }: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();

  const getStats = () => {
    return player.stats
      ? player.stats.map(stat => (
          <div key={stat.name}>
            {stat.name} : {stat.value}
          </div>
        ))
      : 'No stats available';
  };

  return (
    <>
      <Card>
        <div>{player.id}</div>
        <div>{player.platform}</div>
        <hr />
        {player.isLoading ? (
          'Loading...'
        ) : (
          <>
            <div>{player.avatarUrl}</div>
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
