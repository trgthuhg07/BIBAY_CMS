import React from 'react';
import { useLocation } from 'react-router-dom';
import { Moon, Sun, Languages } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const Header = ({ isDarkMode, toggleTheme }) => {
  const location = useLocation();
  const { language, changeLanguage } = useLanguage();
  
  // Format the path for the header title
  const getPageTitle = () => {
    const path = location.pathname;
    if (path === '/dashboard') return 'Dashboard';
    if (path.includes('/wallet')) return 'Wallet Inquiry';
    if (path.includes('/transactions')) return 'Transaction List';
    if (path === '/reconciliation') return 'Reconciliation';
    if (path === '/reports') return 'Reports';
    if (path === '/audit-log') return 'Audit Log';
    return '';
  };

  return (
    <header className="top-header">
      <div className="header-title">
        {getPageTitle()}
      </div>
      
      <div className="header-actions">
        <select 
          value={language} 
          onChange={(e) => changeLanguage(e.target.value)}
          className="select"
          style={{ padding: '0.25rem 2.5rem 0.25rem 0.75rem', fontSize: '0.875rem', minWidth: '70px', height: '36px' }}
        >
          <option value="en">EN</option>
          <option value="vi">VI</option>
          <option value="es">ES</option>
        </select>
        <button className="btn-icon" onClick={toggleTheme}>
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        
        <div className="user-profile">
          <div className="avatar">A</div>
          <div className="logo-text">
            <span className="font-semibold text-sm">CMS Admin</span>
            <span className="text-xs text-secondary">admin</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
