import React, { useEffect, useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'gatsby';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';

import { BLACK, BLUE, LIGHT_GRAY } from '../constants/colors';

const Container = styled.nav`
  width: 280px;
  min-width: 280px;
  max-width: 280px;
  border-right: 1px solid #f4f4f4;

  height: 100vh;
  min-height: 100vh;
  max-height: 100vh;

  overflow: auto;
  padding: 0px;
  padding-bottom: 32px;
  position: sticky;
  top: 0;
  display: block;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const Section = styled.div`

`;

const SectionHeader = styled.h3`
  margin: 0;
  margin-top: 25px;
  padding: 25px 0 8px 24px;
  text-transform: uppercase;
  color: #666666;

  font-weight: normal;
  font-size: 12px;
  line-height: 18px;
  letter-spacing: 0px;

  border-top: 1px solid #f4f4f4;

  ${({ isFirst }) => isFirst && `
    margin-top: 0;
    border-top: none;
  `}
`;

const SectionItems = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0 12px;
`;

const ExpandableSectionItems = styled(SectionItems)`
  height: ${({ style: { isOpen } }) => isOpen ? 'auto' : 0};
  overflow: hidden;
  padding: 0;
  padding-left: 4px;
  margin: ${({ style: { isOpen } }) => isOpen ? '4px 0 4px 4px' : 0};
`;

const SectionItem = styled.li`
  padding: 6px 12px;
  margin: 0;
  margin-top: 1px;
  cursor: pointer;
  border-radius: 4px;

  background: ${({ style: { isActive } }) => isActive ? 'rgba(0,0,0,0.08)' : 'transparent'};
  cursor: pointer;
  color: #111111;

  font-weight: ${({ style: { isActive } }) => isActive ? '500' : 'normal'};
  font-size: 15px;
  line-height: 21px;
  letter-spacing: -0.32px;

  &:hover {
    ${({ style: { isActive } }) => !isActive && `
      background: ${LIGHT_GRAY};
    `}
  }
`;

const ExpandableSectionItem = styled(SectionItem)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${({ style: { anyOpen, isActive } }) => {
    if (isActive || anyOpen) return 'rgba(0,0,0,0.08)';
    return 'transparent';
  }};

  svg {
    font-size: 16px;
    transform: ${({ style: { isOpen } }) => isOpen ? 'translate(0, 1px) rotate(90deg)' : 'translate(0, 1px) rotate(0)'};
    margin-right: -4px;
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

  useEffect(() => {
    setOpenItemPath(() => getOpenItemPath(location.pathname, sections));
    setOpenSubItemPath(() => location.pathname);
  }, [location.pathname]);

  return (
    <Container>
      {
        sections.sort((a, b) => a.idx - b.idx).map(({ items, name }, i) => (
          <Section key={name}>
            <SectionHeader isFirst={i === 0}>{name}</SectionHeader>
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
