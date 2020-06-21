/**
 *
 * DetailsPage
 *
 */

import React, { memo } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components/macro';

import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { reducer, sliceKey } from './slice';
import { selectDetailsPage } from './selectors';
import { detailsPageSaga } from './saga';

interface Props {}

export const DetailsPage = memo((props: Props) => {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: detailsPageSaga });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const detailsPage = useSelector(selectDetailsPage);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const dispatch = useDispatch();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();

  return (
    <>
      <Helmet>
        <title>DetailsPage</title>
        <meta name="description" content="Description of DetailsPage" />
      </Helmet>
      <Div>DetailsPage</Div>
    </>
  );
});

const Div = styled.div``;
