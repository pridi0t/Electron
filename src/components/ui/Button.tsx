import React from 'react';
import styled from 'styled-components';

// ButtonProps 인터페이스를 정의하여 추가 속성들을 포함
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    width?: string;
    heigh?: string;
    color?: string;            // 글자색
    backgroundcolor?: string;  // 배경색
  }

const Button = styled.button<ButtonProps>`
  margin-bottom: 5px;
  padding: 10px 15px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;    // 텍스트가 넘칠 때 말줄임표(...) 표시
  width: ${ props => props.width ? props.width : "100%" };
  height: ${props => props.heigh};
  text-align: left;
  border: none;
  border-radius: 3px;
  font-size: 15px;
  color: ${props => props.color};
  background-color: ${ props => props.backgroundcolor ? props.backgroundcolor : "inherit" };

  & > img {
    margin-right: 10px;
    width: 15px;
    height: 15px;
  }
`;

// props 타입 정의
interface SidebarMenuItemProps {
  icon?: string;            // 이미지 경로를 받으므로 string 타입 (선택)
  text: string;             // label은 문자열 타입
  width?: string;
  height?: string;
  color?: string;           // 글자색
  backgroundcolor?: string; // 배경색
  onClick: () => void;      // 클릭 이벤트 핸들러
} 

const SidebarMenuItem: React.FC<SidebarMenuItemProps> = ({ icon, text, width, height, color, backgroundcolor, onClick }) => {
  return (
    <Button onClick={onClick} color={color} backgroundcolor={backgroundcolor}>
      {/* 이미지 경로가 있는 경우만 아이콘 이미지를 랜더링 */}
      {icon && <img src={icon} alt={text} />}
      {text}
    </Button>
  );
};

export default SidebarMenuItem;