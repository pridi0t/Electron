import React from 'react';
import SidebarMenu from './SidebarMenu';
import { styled } from 'styled-components';

const SidebarWrapper = styled.div`
  overflow: hidden;
  padding: 20px 0px;
  width: 20%;
  min-width: 180px;
  min-height: 100%;
  background-color: #9DB2BF;
`;

const Title = styled.h2`
  margin: 10px 10px;
`;

const Sidebar: React.FC = () => {
  return (
    <SidebarWrapper>
      <Title>GPT-NOTE</Title>
      <SidebarMenu />
    </SidebarWrapper>
  );
};

export default Sidebar;