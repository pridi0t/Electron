import React from 'react';
import { useMenu } from "../../context/MenuContext";
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import Button from '../ui/Button';

const Menu = styled.div`
  text-align: left;

  & :nth-child(3) {
    margin-bottom: 20px;
  }

  & button:hover {
    border: 1px solid #DDE6ED;
    border-radius: 3px;
  }
`;

const SidebarMenu: React.FC = () => {
  const { setCategory } = useMenu();
  // const navigate = useNavigate();

  return (
    <Menu>
      <Button
        text="데이터 동기화"
        color="#DDE6ED"
        onClick={async() => {
            await window.api.convertFileToDB();
            setCategory("conversation");
        }}
      />
      <Button
        icon="images/icon_conversation.png"
        text="Conversation"
        color="#DDE6ED"
        onClick={() => {
          setCategory("conversation");
          // navigate("/conversation");
        }}
      />
      <Button
        icon="images/icon_note.png"
        text="Note"
        color="#DDE6ED"
        onClick={() => {
          setCategory("note");
          // navigate("/note");
        }}
      />
    </Menu>
  );
};

export default SidebarMenu;