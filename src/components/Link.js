import styled from 'styled-components';
import { Link } from 'gatsby';

const StyledLink = styled(Link)`
  color: #333333;
  text-decoration: none;

  &:hover {
    color: #000000;
    text-decoration: none;
  }
`;

export default StyledLink;
