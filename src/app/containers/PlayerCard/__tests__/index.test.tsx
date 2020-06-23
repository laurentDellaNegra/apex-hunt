import React from 'react';
import { render } from '@testing-library/react';
import { Store } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import { configureAppStore } from 'store/configureStore';
import { PlayerCard } from '..';
import { Player } from 'types/Player';
import { PlatformEnum } from 'types/PlatformEnum';

const player: Player = {
  id: 'lepicho',
  platform: PlatformEnum.ORIGIN,
};

const renderComponent = (store: Store) =>
  render(
    <Provider store={store}>
      <PlayerCard player={player} />
    </Provider>,
  );

describe('<PlayerCard />', () => {
  let store: ReturnType<typeof configureAppStore>;

  beforeEach(() => {
    store = configureAppStore();
  });
  it('should match the snapshot', () => {
    const component = renderComponent(store);
    expect(component.container.firstChild).toMatchSnapshot();
  });
});
