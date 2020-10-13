import styled from 'styled-components';
import { Link } from 'gatsby';

import { BLACK, DARK_GRAY } from '../constants/colors';

const StyledLink = styled(Link)`
  color: ${DARK_GRAY} !important;
  text-decoration: none;

  &:hover {
    color: ${BLACK} !important;
    text-decoration: none;
  }
`;

export default StyledLink;
