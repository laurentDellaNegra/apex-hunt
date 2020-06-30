import React from 'react';
import { render } from '@testing-library/react';

import { PlayerCard } from '..';
import { PlayerOverview } from 'types/PlayerOverview';
import { PlatformEnum } from 'types/PlatformEnum';

const player: PlayerOverview = {
  id: '',
  platform: PlatformEnum.ORIGIN,
  isLoading: true,
};

describe('<PlayerCard  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<PlayerCard player={player} />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
