import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import { MenuProvider } from '../context/MenuContext';
import styled from 'styled-components';
import Sidebar from './sidebar/Sidebar';
import ConversationDetail from './conversation/ConversationDetail';

const Layout = styled.div`
  display: flex;
  width: 100%;
  min-height: 100%;
`;

const MainContent = styled.div`
  flex-grow: 1;
  width: 80%;
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
            <Route path="/conversation" element={<p>/conversation Page</p>} />
            <Route path="/conversation/:id" element={<ConversationDetail />} />
            <Route path="/note" element={<p>/note Page</p>} />
          </Routes>
        </MainContent>
      </Layout>
    </Router>
  );
};

export default App;
