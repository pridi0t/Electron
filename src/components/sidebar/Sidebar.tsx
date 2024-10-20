import React from 'react';
import SidebarMenu from './SidebarMenu';
import { styled } from 'styled-components';
import SidebarList from './SidebarList';

const SidebarWrapper = styled.div`
  overflow: hidden;
  padding: 0px 10px;
  width: 20%;
  min-width: 180px;
  min-height: 100%;
  background-color: #27374D;

  & > * {
    margin: 30px 0px;
  }
`;

const Title = styled.h1`
  color: #DDE6ED;
  text-align: center;
`;

const Sidebar: React.FC = () => {
  return (
    <SidebarWrapper>
      <Title>GPT-NOTE</Title>
      <SidebarMenu />
      <SidebarList />
    </SidebarWrapper>
  );
};

export default Sidebar;