import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';

// DOM에서 'root' 요소를 선택
const rootElement = document.getElementById('root');

// React의 루트 컴포넌트를 생성
const root = ReactDOM.createRoot(rootElement!); // Non-null assertion operator 사용

// React의 루트 컴포넌트 렌더링
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
