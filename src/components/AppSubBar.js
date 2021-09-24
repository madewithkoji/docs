import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { navigate } from '@reach/router';

const Container = styled.div`
  width: 100%;
  height: 38px;
  padding: 0 30px;
  font-size: 14px;
  position: relative;
  border-bottom: 1px solid rgba(0,0,0,0.1);
  display: flex;
  color: #666666;
`;

const Wrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
`;

const Mobile = styled.div`
  display: none;

  width: 100%;
  align-items: center;
  @media screen and (max-width: 768px) {
    display: flex;
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

const AppSubBar = ({ location, navItems }) => {
  const currentNavItem = navItems.find(({ root }) => location.pathname.includes(root)) || {};
  const { sections = [] } = currentNavItem;
  const currentSection = sections.find(({ root }) => location.pathname.includes(root)) || {};
  const { items = [] } = currentSection;

  const allItems = [
    ...items,
    ...items.map(({ subItems }) => subItems || []).reduce((acc, cur) => [...cur, ...acc], []),
  ];

  const currentItem = allItems.find(({ path }) => location.pathname.includes(path)) || {};

  const handleNavItemChange = (e) => {
    navigate(e.currentTarget.value);
  };

  const handleSectionChange = (e) => {
    navigate(e.currentTarget.value);
  };

  return (
    <Mobile>
      <Container>
        <Wrapper>
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
                      (sectionItems || []).map(({ name: itemName, path, subItems }) => (
                        <Fragment key={itemName}>
                          <Item value={path}>{itemName}</Item>
                          {
                            subItems && subItems.sort((a, b) => a.idx - b.idx).map(({ name: subItemName, path: subItemPath }) => (
                              <Item key={subItemName} value={subItemPath}>
                                &nbsp;&nbsp;&nbsp;-&nbsp;
                                {subItemName}
                              </Item>
                            ))
                          }
                        </Fragment>
                      ))
                    }
                  </Section>
                ))
              }
            </SectionDropdown>
          </SectionDropdownWrapper>
        </Wrapper>
      </Container>
    </Mobile>
  );
};

AppSubBar.propTypes = {
  location: PropTypes.object,
  navItems: PropTypes.arrayOf(PropTypes.shape({
  })),
};

AppSubBar.defaultProps = {
  location: {},
  navItems: [],
};

export default AppSubBar;
