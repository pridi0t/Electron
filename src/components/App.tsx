import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import { MenuProvider } from '../context/MenuContext';
import styled from 'styled-components';
import ConversationPage from './conversation/ConversationPage';
import Sidebar from './sidebar/Sidebar';

const Layout = styled.div`
  display: flex;
  width: 100%;
  min-height: 100%;
`;

const MainContent = styled.div`
  flex-grow: 1;
  padding: 20px;
`;

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <MenuProvider>
          <Sidebar />
        </MenuProvider>
        <MainContent>
          <Routes>
            <Route path="/" element={<p>Main Page</p>} />
            <Route path="/conversation" element={<ConversationPage/>} />
            <Route path="/note" element={<p>/note Page</p>} />
          </Routes>
        </MainContent>
      </Layout>
    </Router>
  );
};

export default App;
