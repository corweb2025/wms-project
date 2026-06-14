import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './i18n';      // ← i18n 초기화
import './index.css'  // ← 이 한줄 없으면 전부 흰 화면!

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)