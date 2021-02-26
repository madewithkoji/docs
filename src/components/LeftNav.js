import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'gatsby';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';

import { BLACK, BLUE, LIGHT_GRAY } from '../constants/colors';

const Container = styled.nav`
  width: 246px;
  height: 100%;
  max-height: 100vh;
  overflow: auto;
  padding: 0 0 32px 10px;
  position: sticky;
  top: 0;
  margin-left: -10px;
  display: block;

  @media screen and (max-width: 768px) {
    display: none;
  }

  &:hover {
    ::-webkit-scrollbar-thumb {
      background-color: #babac0;
    }
  }

  /* total width */
  ::-webkit-scrollbar {
      background-color: #fff;
      width: 16px;
  }

  /* background of the scrollbar except button or resizer */
  ::-webkit-scrollbar-track {
      background-color: #fff;
  }

  /* scrollbar itself */
  ::-webkit-scrollbar-thumb {
      background-color: transparent;
      border-radius: 16px;
      border: 4px solid #fff;
  }

  /* set button(top and bottom of the scrollbar) */
  ::-webkit-scrollbar-button {
      display:none;
  }
`;

const Section = styled.div`

`;

const SectionHeader = styled.h3`
  margin: 25px auto 8px;
  font-size: 13px;
  text-transform: uppercase;
  font-weight: bold;
  color: #111111;
`;

const SectionItems = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const ExpandableSectionItems = styled(SectionItems)`
  height: ${({ style: { isOpen, itemCount } }) => isOpen ? `${itemCount * 28}px` : 0};
  overflow: hidden;
  padding-left: 4px;
  border-left: 3px solid ${BLUE};
  border-radius: ${({ style: { topOpen, bottomOpen } }) => {
    if (topOpen) return '2.5px 0 0 0';
    if (bottomOpen) return '0 0 0 2.5px';
    return '0';
  }};
  margin: ${({ style: { isOpen } }) => isOpen ? '4px 0 4px 4px' : 0};
`;

const SectionItem = styled.li`
  font-size: 13px;
  padding: 5px 10px;
  margin: 0 0 0 -10px;
  background: ${({ style: { isActive } }) => isActive ? BLUE : 'transparent'};
  cursor: pointer;
  border-radius: 2.5px;
  color: ${({ style: { isActive } }) => isActive ? '#ffffff' : '#111111'};

  &:hover {
    ${({ style: { isActive } }) => !isActive && `
      background: ${LIGHT_GRAY};
      color: ${BLUE};
    `}
  }
`;

const ExpandableSectionItem = styled(SectionItem)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${({ style: { anyOpen, isActive } }) => {
    if (isActive) return BLUE;
    if (anyOpen) return LIGHT_GRAY;
    return 'transparent';
  }};

  svg {
    font-size: 16px;
    transform: ${({ style: { isOpen } }) => isOpen ? 'translate(0, 1px) rotate(90deg)' : 'translate(0, 1px) rotate(0)'};
    transition: all 0.3s;
  }
`;

const StyledLink = styled(Link)`
  color: ${({ style: { isActive } }) => isActive ? '#ffffff' : BLACK};
  text-decoration: none;

  &:hover {
    ${({ style: { isActive } }) => !isActive && `
      color: ${BLUE};
    `}
  }
`;

function comparePaths(locationPath, path) {
  if (locationPath === path) return true;
  if (locationPath.slice(0, -1) === path) return true;

  return false;
}

function getOpenItemPath(locationPath, sections) {
  let openItemPath;

  // eslint-disable-next-line consistent-return
  sections.forEach((section) => {
    (section.items || []).forEach(({ path, subItems }) => {
      if (locationPath === path || locationPath.slice(0, -1) === path) openItemPath = path;

      if (subItems) {
        // eslint-disable-next-line consistent-return
        subItems.forEach(({ path: subItemPath }) => {
          if (locationPath === subItemPath || locationPath.slice(0, -1) === subItemPath) openItemPath = path;
        });
      }
    });
  });

  return openItemPath;
}

const LeftNav = ({ location, navItems }) => {
  const currentNavItem = navItems.find(({ root }) => location.pathname.includes(root)) || {};
  const { sections = [] } = currentNavItem;

  const [openItemPath, setOpenItemPath] = useState(getOpenItemPath(location.pathname, sections));
  const [openSubItemPath, setOpenSubItemPath] = useState(location.pathname);

  return (
    <Container>
      {
        sections.sort((a, b) => a.idx - b.idx).map(({ items, name }) => (
          <Section key={name}>
            <SectionHeader>{name}</SectionHeader>
            <SectionItems>
              {
                items.sort((a, b) => a.idx - b.idx).map(({ name: itemName, path, subItems }) => !subItems ?
                  (
                    <StyledLink
                      key={path}
                      style={{ isActive: comparePaths(location.pathname, path) }}
                      to={path}
                    >
                      <SectionItem
                        onClick={() => {
                          setOpenItemPath(false);
                          setOpenSubItemPath(false);
                        }}
                        style={{ isActive: comparePaths(location.pathname, path) }}
                      >
                        {itemName}
                      </SectionItem>
                    </StyledLink>
                  ) :
                  (
                    <Fragment key={path}>
                      <StyledLink
                        style={{ isActive: comparePaths(location.pathname, path) }}
                        to={path}
                      >
                        <ExpandableSectionItem
                          style={{
                            isActive: comparePaths(location.pathname, path),
                            anyOpen: openItemPath === path,
                            isOpen: openItemPath === path,
                          }}
                          onClick={() => setOpenItemPath(path)}
                        >
                          <span>{itemName}</span>
                          <KeyboardArrowRightIcon />
                        </ExpandableSectionItem>
                      </StyledLink>

                      <ExpandableSectionItems
                        style={{
                          bottomOpen: openSubItemPath === subItems[subItems.length - 1].path,
                          isOpen: openItemPath === path,
                          itemCount: subItems.length,
                          topOpen: openSubItemPath === subItems[0].path,
                        }}
                      >
                        {
                          subItems.sort((a, b) => a.idx - b.idx).map(({ name: subItemName, path: subItemPath }) => (
                            <StyledLink
                              key={subItemName}
                              style={{
                                isActive: comparePaths(location.pathname, subItemPath),
                              }}
                              to={subItemPath}
                            >
                              <SectionItem
                                onClick={() => setOpenSubItemPath(subItemPath)}
                                style={{
                                  isActive: comparePaths(location.pathname, subItemPath),
                                }}
                              >
                                {subItemName}
                              </SectionItem>
                            </StyledLink>
                          ))
                        }
                      </ExpandableSectionItems>
                    </Fragment>
                  ))
              }
            </SectionItems>
          </Section>
        ))
      }
    </Container>
  );
};

LeftNav.propTypes = {
  location: PropTypes.object,
  navItems: PropTypes.arrayOf(PropTypes.shape({

  })),
};

LeftNav.defaultProps = {
  location: {},
  navItems: [],
};

export default LeftNav;
