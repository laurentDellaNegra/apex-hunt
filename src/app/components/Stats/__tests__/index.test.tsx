import React from 'react';
import { render } from '@testing-library/react';

import { Stats } from '..';

describe('<Stats  />', () => {
  const stats = {};
  it('should match snapshot', () => {
    const loadingIndicator = render(<Stats stats={stats} />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
