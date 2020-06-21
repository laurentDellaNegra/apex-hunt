/**
 *
 * Asynchronously loads the component for DetailsPage
 *
 */

import { lazyLoad } from 'utils/loadable';

export const DetailsPage = lazyLoad(
  () => import('./index'),
  module => module.DetailsPage,
);
