import React from 'react';
import { useMenu } from "../../context/MenuContext";
import { styled } from 'styled-components';
import SidebarMenu from './SidebarMenu';
import ContextList from './ContextList';

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
  // 현재 선택된 카테고리 가져오기
  const { currentCategory } = useMenu();

  return (  
    <SidebarWrapper>
      <Title>GPT-NOTE</Title>
      <SidebarMenu />
      <div>
        {currentCategory === "conversation" && <ContextList/>}
        {currentCategory === "note" && <p>Note List</p>}
      </div>
    </SidebarWrapper>
  );
};

export default Sidebar;