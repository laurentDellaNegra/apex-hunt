/**
 *
 * DetailsPage
 *
 */

import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components/macro';

import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { reducer, sliceKey } from './slice';
import { selectError, selectLoading, selectPlayerDetails } from './selectors';
import { detailsPageSaga } from './saga';
import { useParams } from 'react-router-dom';
import { actions } from './slice';
import { Stats } from 'app/components/Stats';

interface Props {}

export const DetailsPage = (props: Props) => {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: detailsPageSaga });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const error = useSelector(selectError);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const loading = useSelector(selectLoading);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const playerDetails = useSelector(selectPlayerDetails);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const dispatch = useDispatch();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();

  const { platform, id } = useParams();

  const useEffectOnMount = (effect: React.EffectCallback) => {
    useEffect(effect, []);
  };
  useEffectOnMount(() => {
    dispatch(
      actions.setPlayer({
        id,
        platform,
      }),
    );
    dispatch(actions.loadDetails());
  });

  return (
    <>
      <Helmet>
        <title>DetailsPage</title>
        <meta name="description" content="Description of DetailsPage" />
      </Helmet>
      <Div>DetailsPage</Div>
      <Div>Platform: {platform}</Div>
      <Div>Id: {id}</Div>
      <hr />
      <Div>{loading && 'Loading...'}</Div>
      <img src={playerDetails?.avatarUrl} alt="Avatar" />
      <Div>Country: {playerDetails?.countryCode}</Div>
      <Div>Active legend: {playerDetails?.activeLegend}</Div>
      <hr />
      <Div>
        {playerDetails?.segments.map((s, i) => (
          <div key={i}>
            <img src={s.imageUrl} alt="legend" height="300" />
            <h3>Stats:</h3>
            <Stats stats={s.stats} />
          </div>
        ))}
      </Div>
    </>
  );
};

const Div = styled.div``;
