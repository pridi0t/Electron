import React, { useState } from 'react';
import { styled } from 'styled-components';
import Button from '../ui/Button';
import SidebarList from './SidebarList';

const Menu = styled.div`
  width: 100%;
  text-align: left;

  & button:hover {
    border: 1px solid #DDE6ED;
    border-radius: 3px;
  }
`;

const SidebarMenu: React.FC = () => {
  const [showSidebarList, setShowSidebarList] = useState(false);

  return (
    <Menu>
      <Button
        icon="images/icon_conversation.png"
        text="Conversation"
        color="#DDE6ED"
        onClick={() => console.log("Conversation Button Click")}
      />
      <Button
        icon="images/icon_note.png"
        text="Note"
        color="#DDE6ED"
        onClick={() => console.log("Note Button Click")}
      />
      <Button
        text="GPT 데이터 가져오기"
        color="#DDE6ED"
        onClick={async() => {
            await window.api.convertFileToDB();
            setShowSidebarList(true);
        }}
      />
      {showSidebarList && <SidebarList />}
    </Menu>
  );
};

export default SidebarMenu;