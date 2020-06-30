/**
 *
 * Stats
 *
 */
import React, { memo } from 'react';
import styled from 'styled-components/macro';

interface Props {
  stats: any;
}

export const Stats = memo(({ stats }: Props) => {
  console.log(stats);
  return (
    <Div>
      {stats.map(stat => (
        <div key={stat.name}>
          {stat.name} : {stat.value}
        </div>
      ))}
    </Div>
  );
});

const Div = styled.div``;
