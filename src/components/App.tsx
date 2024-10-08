import React from 'react';

const App: React.FC = () => {
  return (
    <div id="wrapper">
      <div id="sidebar">
          <h2>NOTE LIST</h2>
          <button id="syncConvBtn">대화 동기화</button>
          <div id="sidebarList"></div>
      </div>
      <div id="contentBox"></div>
    </div>
  );
};

export default App;
