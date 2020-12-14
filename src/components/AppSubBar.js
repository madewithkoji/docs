import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { navigate } from '@reach/router';

import SearchIcon from '@material-ui/icons/Search';
import ArrowIcon from '@material-ui/icons/KeyboardArrowRight';

const Container = styled.div`
  width: 100%;
  height: 38px;
  padding: 0 30px;
  font-size: 14px;
  position: relative;
  background-color: #f4f4f4;
  border-bottom: 1px solid rgba(0,0,0,0.1);
  display: flex;
  color: #666666;
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  align-items: center;
`;

const Mobile = styled.div`
  width: 100%;
  display: none;
  align-items: center;

  @media screen and (max-width: 768px) {
    display: flex;
  }
`;

const Desktop = styled.div`
  width: 100%;
  display: flex;
  align-items: center;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const NavItemDropdownWrapper = styled.div`
  flex: 1 0 auto;
  display: flex;
`;

const NavItemDropdown = styled.select`
  background: transparent;
  border: 1px solid transparent;
  outline: 0;
  border-radius: 2.5px;
  padding: 4px;
  margin-left: -8px;
  max-width: 72px;

  &:hover {
    border: 1px solid #111111;
    background: #ffffff;
  }
`;

const NavItemDropdownItem = styled.option`

`;

const SectionDropdownWrapper = styled.div`
  display: flex;
`;

const SectionDropdown = styled.select`
  background: transparent;
  border: 1px solid transparent;
  outline: 0;
  border-radius: 2.5px;
  padding: 4px;
  max-width: 160px;

  &:hover {
    border: 1px solid #111111;
    background: #ffffff;
  }
`;

const Section = styled.optgroup`

`;

const Item = styled.option`

`;

const BreadCrumbWrapper = styled.div`
  flex: 1 0 auto;
  display: flex;
`;

const BreadCrumb = styled.div`
  display: flex;
`;

const Crumb = styled.div`
  margin-right: 6px;
  display: flex;
  align-items: center;
  line-height: 1;
  font-size: 13px;

  svg {
    width: 18px;
    height: 18px;
  }
`;

const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-right: 8px;
  cursor: pointer;
  width: 184px;

  svg {
    fill: #666666;
    margin-right: 4px;
    width: 18px;
    height: 18px;
  }
`;

const AppSubBar = ({ location, navItems, onSearchClick }) => {
  const currentNavItem = navItems.find(({ root }) => location.pathname.includes(root)) || {};
  const { sections = [] } = currentNavItem;
  const currentSection = sections.find(({ root }) => location.pathname.includes(root)) || {};
  const { items = [] } = currentSection;
  const currentItem = items.find(({ path }) => location.pathname.includes(path)) || {};

  const handleNavItemChange = (e) => {
    navigate(e.currentTarget.value);
  };

  const handleSectionChange = (e) => {
    navigate(e.currentTarget.value);
  };

  return (
    <Container>
      <Wrapper>
        <Mobile>
          <NavItemDropdownWrapper>
            <NavItemDropdown onChange={handleNavItemChange} value={currentNavItem.defaultPath}>
              {
                navItems.map(({ defaultPath, name }) => (
                  <NavItemDropdownItem key={name} value={defaultPath}>
                    {name}
                  </NavItemDropdownItem>
                ))
              }
            </NavItemDropdown>
          </NavItemDropdownWrapper>
          <SectionDropdownWrapper>
            <SectionDropdown onChange={handleSectionChange} value={currentItem.path}>
              {
                (currentNavItem.sections || []).map(({ name, items: sectionItems }) => (
                  <Section key={name} label={name}>
                    {
                      (sectionItems || []).map(({ name: itemName, path }) => (
                        <Item key={itemName} value={path}>{itemName}</Item>
                      ))
                    }
                  </Section>
                ))
              }
            </SectionDropdown>
          </SectionDropdownWrapper>
        </Mobile>
        <Desktop>
          <BreadCrumbWrapper>
            {
              currentItem &&
              <BreadCrumb>
                <Crumb>
                  {currentNavItem.name}
                </Crumb>
                <Crumb>
                  <ArrowIcon />
                </Crumb>
                <Crumb>
                  {currentSection.name}
                </Crumb>
                <Crumb>
                  <ArrowIcon />
                </Crumb>
                <Crumb>
                  {currentItem.name}
                </Crumb>
              </BreadCrumb>
            }
          </BreadCrumbWrapper>
          <SearchWrapper onClick={onSearchClick}>
            <SearchIcon />
            {'Search'}
          </SearchWrapper>
        </Desktop>
      </Wrapper>
    </Container>
  );
};

AppSubBar.propTypes = {
  location: PropTypes.object,
  navItems: PropTypes.arrayOf(PropTypes.shape({

  })),
  onSearchClick: PropTypes.func,
};

AppSubBar.defaultProps = {
  location: {},
  navItems: [],
  onSearchClick() {},
};

export default AppSubBar;
