/**
 *
 * Asynchronously loads the component for BrowsePage
 *
 */

import { lazyLoad } from 'utils/loadable';

export const BrowsePage = lazyLoad(
  () => import('./index'),
  module => module.BrowsePage,
);
