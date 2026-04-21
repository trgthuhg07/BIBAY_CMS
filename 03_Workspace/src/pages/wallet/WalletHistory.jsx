import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowDownLeft, ArrowUpRight, Search, Filter, Download } from 'lucide-react';
import { DUMMY_TRANSACTIONS, MathSign } from '../../utils/dummyData';

const WalletHistory = () => {
  const { walletId } = useParams();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  
  // Connect to wallet transactions or fallback
  const displayWalletId = DUMMY_TRANSACTIONS.some(t => t.walletId === walletId) ? walletId : "260421182131";
  
  const filteredTransactions = DUMMY_TRANSACTIONS.filter(txn => {
    if (txn.walletId !== displayWalletId) return false;
    
    if (searchTerm && !txn.id.includes(searchTerm) && !txn.type.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
    }
    
    return true;
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <button className="btn-icon" onClick={() => navigate(-1)}>
          <ArrowLeft size={20} />
        </button>
        <div>
          <h2 className="font-bold text-xl mb-1">Transaction History</h2>
          <p className="text-sm text-secondary">Wallet ID: {walletId}</p>
        </div>
      </div>

      <div className="card">
        <div className="card-header bg-white" style={{ display: 'flex', gap: '1rem' }}>
          <div style={{ flex: 1, position: 'relative' }}>
            <Search size={16} className="absolute text-secondary" style={{ left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
            <input 
              type="text" 
              className="input w-full pl-10" 
              placeholder="Search by Txn ID or Type..." 
              style={{ paddingLeft: '2.5rem' }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <select className="select">
            <option>All Statuses</option>
            <option>SUCCESS</option>
            <option>FAILED</option>
            <option>PENDING</option>
          </select>
          
          <select className="select">
            <option>All Types</option>
            <option>Cash-in</option>
            <option>Cash-out</option>
            <option>Payment</option>
            <option>Transfer</option>
          </select>

          <button className="btn btn-outline" style={{ color: 'var(--primary-color)', borderColor: 'var(--primary-light)', backgroundColor: 'var(--primary-light)', backgroundOpacity: 0.2 }}>
            <Filter size={16} />
            <span>More Filters</span>
          </button>
          
          <button className="btn btn-outline">
            <Download size={16} />
            <span>Export</span>
          </button>
        </div>
        
        <div className="table-container">
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
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map(txn => (
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
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-secondary">
                    No transactions found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default WalletHistory;
