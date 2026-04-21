import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import WalletList from './pages/wallet/WalletList';
import WalletDetail from './pages/wallet/WalletDetail';
import WalletHistory from './pages/wallet/WalletHistory';
import ComingSoon from './pages/ComingSoon';

import { LanguageProvider } from './context/LanguageContext';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check for system preference or local storage
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDarkMode(true);
      document.body.setAttribute('data-theme', 'dark');
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(prev => {
      const next = !prev;
      if (next) {
        document.body.setAttribute('data-theme', 'dark');
        localStorage.theme = 'dark';
      } else {
        document.body.removeAttribute('data-theme');
        localStorage.theme = 'light';
      }
      return next;
    });
  };

  return (
    <LanguageProvider>
      <Routes>
        <Route path="/" element={<Layout isDarkMode={isDarkMode} toggleTheme={toggleTheme} />}>
          <Route index element={<Navigate to="/wallet" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="wallet" element={<WalletList />} />
          <Route path="wallet/:walletId" element={<WalletDetail />} />
          <Route path="wallet/:walletId/history" element={<WalletHistory />} />
          {/* Placeholders for other routes */}
          <Route path="transactions" element={<ComingSoon title="Danh sách Giao dịch đang phát triển" />} />
          <Route path="reconciliation" element={<ComingSoon title="Đối soát đang phát triển" />} />
          <Route path="reports" element={<ComingSoon title="Báo cáo đang phát triển" />} />
          <Route path="audit-log" element={<ComingSoon title="Audit Log đang phát triển" />} />
          <Route path="*" element={<ComingSoon title="Trang không tồn tại hoặc đang phát triển" />} />
        </Route>
      </Routes>
    </LanguageProvider>
  );
}

export default App;
