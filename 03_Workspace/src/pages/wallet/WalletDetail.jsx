import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, User, ShieldCheck, Activity, CreditCard, ArrowDownLeft, ArrowUpRight, Copy, ArrowLeftRight } from 'lucide-react';
import { DUMMY_WALLETS, DUMMY_TRANSACTIONS, getStatusClass, MathSign } from '../../utils/dummyData';
import ComingSoon from '../ComingSoon';




const WalletDetail = () => {
  const { walletId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('transactions');

  // Find dummy wallet
  const wallet = DUMMY_WALLETS.find(w => w.id === walletId) || DUMMY_WALLETS[0];

  if (wallet.type !== 'PERSONAL') {
    return <ComingSoon title={`Chi tiết Loại ví ${wallet.type} đang được phát triển`} />;
  }

  // Calculate dynamic balances based on dummy available balance
  const availableNum = parseFloat(wallet.balance.replace(/,/g, ''));
  const holdNum = availableNum * 0.1; // Make hold balance 10%
  const currentNum = availableNum + holdNum;
  
  const formattedCurrent = currentNum.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const formattedHold = holdNum.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  // Get transactions
  const defaultWalletId = "260421182131"; 
  const displayWalletId = DUMMY_TRANSACTIONS.some(t => t.walletId === wallet.id) ? wallet.id : defaultWalletId;
  const recentTransactions = DUMMY_TRANSACTIONS.filter(t => t.walletId === displayWalletId).slice(0, 5);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <button className="btn-icon" onClick={() => navigate('/wallet')}>
          <ArrowLeft size={20} />
        </button>
        <div>
          <h2 className="font-bold text-xl mb-1 flex items-center gap-3">
            Wallet Details 
            <span className={`status-badge ${getStatusClass(wallet.status)}`}>{wallet.status}</span>
            <span className="status-badge bg-blue-100 text-blue-800" style={{ backgroundColor: '#dbeafe', color: '#1e40af' }}>KYC Level 2</span>
          </h2>
          <p className="text-sm text-secondary flex items-center gap-2">
            ID: {wallet.id} <Copy size={12} className="cursor-pointer" />
          </p>
        </div>
      </div>

      {/* Top Overview Row */}
      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem', alignItems: 'stretch' }}>
        
        {/* Available Balance */}
        <div className="card" style={{ flex: '0 1 auto', minWidth: '220px', background: 'var(--primary-color)', color: 'white', border: 'none' }}>
          <div className="card-body p-4 flex flex-col justify-center h-full">
            <div className="text-xs font-medium opacity-80 mb-1 uppercase tracking-wide">Available Balance</div>
            <div className="font-bold text-2xl tracking-tight whitespace-nowrap">
              {wallet.currency} {wallet.balance}
            </div>
          </div>
        </div>

        {/* Current Balance */}
        <div className="card" style={{ flex: '0 1 auto', minWidth: '180px' }}>
          <div className="card-body p-4 flex flex-col justify-center h-full">
            <div className="text-xs text-secondary font-medium mb-1 uppercase tracking-wide">Current Balance</div>
            <div className="font-bold text-xl text-main tracking-tight whitespace-nowrap">
              {wallet.currency} {formattedCurrent}
            </div>
          </div>
        </div>

        {/* Hold Balance */}
        <div className="card" style={{ flex: '0 1 auto', minWidth: '180px', borderLeft: '3px solid #ef4444' }}>
          <div className="card-body p-4 flex flex-col justify-center h-full">
            <div className="text-xs font-medium mb-1 uppercase tracking-wide" style={{ color: '#ef4444' }}>Hold Balance</div>
            <div className="font-bold text-xl tracking-tight whitespace-nowrap" style={{ color: '#ef4444' }}>
              {wallet.currency} {formattedHold}
            </div>
          </div>
        </div>

        {/* Wallet Profile Info */}
        <div className="card" style={{ flex: '1 1 auto' }}>
          <div className="card-body p-4 flex flex-col justify-center h-full">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', rowGap: '0.75rem', columnGap: '1rem' }}>
              <div>
                <div className="text-xs text-secondary mb-0.5 uppercase font-medium">Type</div>
                <div className="font-semibold text-sm">{wallet.type}</div>
              </div>
              <div>
                <div className="text-xs text-secondary mb-0.5 uppercase font-medium">Category</div>
                <div className="font-semibold text-sm whitespace-nowrap overflow-hidden text-ellipsis" title={wallet.category}>{wallet.category}</div>
              </div>
              <div>
                <div className="text-xs text-secondary mb-0.5 uppercase font-medium">Contact</div>
                <div className="font-semibold text-sm">{wallet.contact}</div>
              </div>
              <div>
                <div className="text-xs text-secondary mb-0.5 uppercase font-medium">Created At</div>
                <div className="font-semibold text-sm whitespace-nowrap overflow-hidden text-ellipsis" title={wallet.createdAt}>{wallet.createdAt}</div>
              </div>
            </div>
          </div>
        </div>
        
      </div>

      {/* Tabs */}
      <div className="card">
        <div className="flex border-b" style={{ borderColor: 'var(--border-color)' }}>
          <button 
            className={`nav-item flex-1 justify-center py-4 rounded-none border-b-2 text-sm font-normal ${activeTab === 'transactions' ? 'text-primary' : 'text-secondary'}`}
            style={{ borderBottomColor: activeTab === 'transactions' ? 'var(--primary-color)' : 'transparent', backgroundColor: 'transparent' }}
            onClick={() => setActiveTab('transactions')}
          >
            <ArrowLeftRight size={18} className="mr-2" /> Recent Transactions
          </button>
          <button 
            className={`nav-item flex-1 justify-center py-4 rounded-none border-b-2 text-sm font-normal ${activeTab === 'info' ? 'text-primary' : 'text-secondary'}`}
            style={{ borderBottomColor: activeTab === 'info' ? 'var(--primary-color)' : 'transparent', backgroundColor: 'transparent' }}
            onClick={() => setActiveTab('info')}
          >
            <User size={18} className="mr-2" /> Wallet Info
          </button>
          <button 
            className={`nav-item flex-1 justify-center py-4 rounded-none border-b-2 text-sm font-normal ${activeTab === 'limits' ? 'text-primary' : 'text-secondary'}`}
            style={{ borderBottomColor: activeTab === 'limits' ? 'var(--primary-color)' : 'transparent', backgroundColor: 'transparent' }}
            onClick={() => setActiveTab('limits')}
          >
            <ShieldCheck size={18} className="mr-2" /> Limits & Rules
          </button>
          <button 
            className={`nav-item flex-1 justify-center py-4 rounded-none border-b-2 text-sm font-normal ${activeTab === 'audit' ? 'text-primary' : 'text-secondary'}`}
            style={{ borderBottomColor: activeTab === 'audit' ? 'var(--primary-color)' : 'transparent', backgroundColor: 'transparent' }}
            onClick={() => setActiveTab('audit')}
          >
            <Activity size={18} className="mr-2" /> Audit Activity
          </button>
        </div>

        <div className="card-body">
          {activeTab === 'transactions' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-lg">Recent Transactions</h3>
                <button 
                  className="btn btn-primary" 
                  onClick={() => navigate(`/wallet/${wallet.id}/history`)}
                >
                  View Full History
                </button>
              </div>
              <table className="table w-full">
                <thead>
                  <tr>
                    <th>Txn ID</th>
                    <th>Type</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentTransactions.map(txn => (
                    <tr key={txn.id}>
                      <td className="font-semibold text-primary">{txn.id}</td>
                      <td>
                        <span className="flex items-center gap-2">
                          {txn.sign === MathSign.PLUS ? (
                            <ArrowDownLeft size={16} className="text-success" />
                          ) : (
                            <ArrowUpRight size={16} className="text-danger" />
                          )}
                          {txn.type}
                        </span>
                      </td>
                      <td className={`font-semibold ${txn.sign === MathSign.PLUS ? 'text-success' : ''}`}>
                        {txn.sign} {txn.currency} {txn.amount}
                      </td>
                      <td>
                        <span className={`status-badge ${txn.status === 'SUCCESS' ? 'status-success' : txn.status === 'FAILED' ? 'status-failed' : 'status-processing'}`}>
                          {txn.status}
                        </span>
                      </td>
                      <td>{txn.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'info' && (
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-lg border-b pb-2 mb-4" style={{ borderColor: 'var(--border-color)' }}>Owner Profile</h3>
                <div className="form-wrapper">
                  <div className="form-group">
                    <span className="text-secondary text-sm">Full Name</span>
                    <span className="font-medium text-base">{wallet.ownerName}</span>
                  </div>
                  <div className="form-group">
                    <span className="text-secondary text-sm">Phone Number</span>
                    <span className="font-medium text-base">{wallet.contact}</span>
                  </div>
                  <div className="form-group">
                    <span className="text-secondary text-sm">Date of Birth</span>
                    <span className="font-medium text-base">12/05/1990</span>
                  </div>
                  <div className="form-group">
                    <span className="text-secondary text-sm">Address</span>
                    <span className="font-medium text-base truncate max-w-[200px]" title="Lima, Peru 123">Lima, Peru 123</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-lg border-b pb-2 mb-4" style={{ borderColor: 'var(--border-color)' }}>KYC Information</h3>
                <div className="form-wrapper">
                  <div className="form-group">
                    <span className="text-secondary text-sm">KYC Level</span>
                    <span className="font-medium text-base">Level 2</span>
                  </div>
                  <div className="form-group">
                    <span className="text-secondary text-sm">Verification</span>
                    <div>
                      <span className="status-badge status-success">VERIFIED</span>
                    </div>
                  </div>
                  <div className="form-group">
                    <span className="text-secondary text-sm">Document Type</span>
                    <span className="font-medium text-base">DNI</span>
                  </div>
                  <div className="form-group">
                    <span className="text-secondary text-sm">Document Number</span>
                    <span className="font-medium text-base">{wallet.dni}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'limits' && (
            <div>
              <h3 className="font-semibold text-lg mb-4">Current Limits Usage</h3>
              
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">Daily Limit</span>
                    <span><span className="font-bold text-danger">S/ 4,500.00</span> / S/ 5,000.00</span>
                  </div>
                  <div style={{ width: '100%', height: '8px', backgroundColor: 'var(--border-color)', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: '90%', height: '100%', backgroundColor: 'var(--status-failed-text)' }}></div>
                  </div>
                  <div className="text-xs text-danger mt-1">Warning: 90% threshold reached</div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">Monthly Limit</span>
                    <span><span className="font-bold">S/ 12,000.00</span> / S/ 20,000.00</span>
                  </div>
                  <div style={{ width: '100%', height: '8px', backgroundColor: 'var(--border-color)', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: '60%', height: '100%', backgroundColor: 'var(--status-success-text)' }}></div>
                  </div>
                </div>
                
                <div className="mt-6 pt-4 border-t" style={{ borderColor: 'var(--border-color)' }}>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-secondary">Single Transaction Limit</span>
                    <span className="font-medium">S/ 2,000.00</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'audit' && (
            <div>
              <h3 className="font-semibold text-lg mb-4">Audit Activity</h3>
              <div className="table-container">
                <table className="table w-full">
                  <thead>
                    <tr>
                      <th>Date / Time</th>
                      <th>Action / Event</th>
                      <th>Performed By</th>
                      <th>Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="text-sm font-medium">21/04/2026 15:58:00</td>
                      <td className="font-semibold">Cash-in Transaction</td>
                      <td>System</td>
                      <td className="text-secondary text-sm">Processed automatically</td>
                    </tr>
                    <tr>
                      <td className="text-sm font-medium">19/04/2026 10:20:00</td>
                      <td className="font-semibold">KYC Approved</td>
                      <td>admin_kyc</td>
                      <td className="text-secondary text-sm">Document validation completed</td>
                    </tr>
                    <tr>
                      <td className="text-sm font-medium">15/04/2026 09:00:00</td>
                      <td className="font-semibold">Wallet Created</td>
                      <td>User</td>
                      <td className="text-secondary text-sm">Registration from Mobile App</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default WalletDetail;
