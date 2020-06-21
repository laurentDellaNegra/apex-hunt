/**
 *
 * Header
 *
 */
import React, { memo } from 'react';
import styled from 'styled-components/macro';
import { useTranslation } from 'react-i18next';
import Banner from './apex-dark.svg';
import { Link } from 'react-router-dom';

interface Props {}

export const Header = memo((props: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();

  return (
    <Div>
      <img alt="A skull represent the brand site" src={Banner} />
      <Link to="/">Home</Link>
      <Link to="/browse">Browse</Link>
      <Link to="/details">Details</Link>
    </Div>
  );
});

const Div = styled.div``;
