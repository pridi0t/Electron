import React from 'react';
import { styled } from 'styled-components';
import Button from '../ui/Button';

const Menu = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px 10px;
  text-align: left;
  background-color: #DDE6ED;
`;

const SidebarMenu: React.FC = () => {
  return (
    <Menu>
      <Button
        icon="images/icon_conversation.png"
        text="Conversation"
        color="#DDE6ED"
        backgroundcolor="#27374D"
        onClick={() => console.log("Button Click")}
      />
      <Button
        icon="images/icon_note.png"
        text="Note"
        color="#DDE6ED"
        backgroundcolor="#27374D"
        onClick={() => console.log("Button Click")}
      />
    </Menu>
  );
};

export default SidebarMenu;