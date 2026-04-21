import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

const Layout = ({ isDarkMode, toggleTheme }) => {
  return (
    <div className="app-container">
      <Sidebar />
      <main className="main-content">
        <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
        <div className="page-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
