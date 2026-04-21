import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, ListOrdered, ArrowLeftRight, Users, FileBarChart, Shield, LogOut, ChevronLeft } from 'lucide-react';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-icon">B</div>
        <div className="logo-text">
          <span className="logo-title">BiPay CMS</span>
          <span className="logo-subtitle">Core Wallet</span>
        </div>
      </div>
      
      <nav className="sidebar-nav">
        <div className="nav-group">
          <div className="nav-group-title">Overview</div>
          <NavLink to="/dashboard" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <LayoutDashboard size={18} />
            <span>Dashboard</span>
          </NavLink>
        </div>
        
        <div className="nav-group">
          <div className="nav-group-title">Transactions</div>
          <NavLink to="/transactions" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <ArrowLeftRight size={18} />
            <span>Transaction List</span>
          </NavLink>
          <NavLink to="/reconciliation" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <ListOrdered size={18} />
            <span>Reconciliation</span>
          </NavLink>
        </div>
        
        <div className="nav-group">
          <div className="nav-group-title">Management</div>
          <NavLink to="/wallet" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <Users size={18} />
            <span>Wallet Inquiry</span>
          </NavLink>
          <NavLink to="/reports" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <FileBarChart size={18} />
            <span>Reports</span>
          </NavLink>
        </div>
        
        <div className="nav-group">
          <div className="nav-group-title">System</div>
          <NavLink to="/audit-log" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <Shield size={18} />
            <span>Audit Log</span>
          </NavLink>
        </div>
      </nav>
      
      <div className="sidebar-footer">
        <button className="nav-item" style={{ width: '100%', padding: '0.75rem 0', background: 'transparent' }}>
          <LogOut size={18} />
          <span>Log out</span>
        </button>
        <button className="nav-item mt-4 justify-center" style={{ width: '100%', padding: '0.75rem 0', background: 'transparent' }}>
          <ChevronLeft size={18} />
          <span>Collapse</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
