import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Filter, Search, Download, RefreshCw, Eye, Info, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, X, SearchX, Play, Users } from 'lucide-react';
import { DUMMY_WALLETS, getStatusClass } from '../../utils/dummyData';
import { useLanguage } from '../../context/LanguageContext';
import { useTranslation } from '../../locales/translations';

const WalletList = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = useTranslation(language);
  // Filter
  const [searchTerm, setSearchTerm] = useState('');
  const [showAdvancedFilter, setShowAdvancedFilter] = useState(false);
  const [statusFilter, setStatusFilter] = useState('-- Chọn Status --');
  const [typeFilter, setTypeFilter] = useState('-- Chọn Type --');
  // Form input states
  const [filterForm, setFilterForm] = useState({
    orgName: '-- Chọn Tên đơn vị --',
    subOrg: '-- Chọn Đơn vị trực thuộc --',
    fullName: '',
    dni: '',
    taxId: '',
    dateFrom: '',
    dateTo: ''
  });
  
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);

  const filteredWallets = DUMMY_WALLETS.filter(wallet => {
    // Status filter
    if (statusFilter !== '-- Chọn Status --' && wallet.status !== statusFilter) {
      return false;
    }
    
    // Type filter
    if (typeFilter !== '-- Chọn Type --' && wallet.type !== typeFilter) {
      return false;
    }
    
    // Search term filter
    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();
      return (
        wallet.id.toLowerCase().includes(lowerSearch) ||
        wallet.ownerName.toLowerCase().includes(lowerSearch) ||
        wallet.contact.toLowerCase().includes(lowerSearch) ||
        wallet.dni.toLowerCase().includes(lowerSearch)
      );
    }
    
    return true;
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter, typeFilter, itemsPerPage]);

  const totalRecords = filteredWallets.length;
  const totalPages = Math.ceil(totalRecords / itemsPerPage) || 1;
  const paginatedWallets = filteredWallets.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 4) {
        for (let i = 1; i <= 5; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 4; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      }
    }
    return pages;
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-bold text-xl mb-1">{t('walletListTitle')}</h2>
          <p className="text-sm text-secondary">{filteredWallets.length} {t('walletsFound')}</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="btn btn-outline">
            <RefreshCw size={16} />
            <span>{t('refresh')}</span>
          </button>
          <button className="btn btn-outline">
            <Download size={16} />
            <span>{t('export')}</span>
          </button>
        </div>
      </div>

      <div className="card shadow-none border-0 bg-transparent">
        <div className="relative">
          <div className="card-header" style={{ backgroundColor: 'var(--panel-bg)', display: 'flex', gap: '1rem', alignItems: 'flex-end', borderBottom: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', paddingBottom: showAdvancedFilter ? '1rem' : undefined }}>
            
            <div className="relative flex items-center" style={{ paddingBottom: '2px' }}>
              <button 
                className={`btn btn-outline`}
                style={showAdvancedFilter ? { color: 'var(--primary-color)', borderColor: 'var(--primary-light)', backgroundColor: 'var(--primary-light)', opacity: 0.9 } : {}}
                onClick={() => setShowAdvancedFilter(!showAdvancedFilter)}
              >
                <Filter size={16} />
                <span>{t('moreFilters')}</span>
                {Object.values(filterForm).filter(v => v && v !== '' && !v.includes('-- Chọn')).length > 0 && (
                  <span style={{ backgroundColor: 'var(--primary-color)', color: 'white', padding: '2px 6px', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold' }}>
                    {Object.values(filterForm).filter(v => v && v !== '' && !v.includes('-- Chọn')).length}
                  </span>
                )}
              </button>
              {Object.values(filterForm).some(v => v && v !== '' && !v.includes('-- Chọn')) && (
                <button 
                  className="ml-3 text-secondary hover:text-primary text-sm font-medium underline"
                  onClick={() => setFilterForm({
                    orgName: '-- Chọn Tên đơn vị --',
                    subOrg: '-- Chọn Đơn vị trực thuộc --',
                    fullName: '',
                    dni: '',
                    taxId: '',
                    dateFrom: '',
                    dateTo: ''
                  })}
                >
                  Xóa bộ lọc
                </button>
              )}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <label style={{ fontSize: '13px', color: 'var(--text-secondary)', fontWeight: 500 }}>{t('status')}</label>
              <select className="select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} style={{ width: '180px' }}>
                <option value="-- Chọn Status --">{t("-- Chọn Status --")}</option>
                <option value="ACTIVE">{t("ACTIVE")}</option>
                <option value="PENDING">{t("PENDING")}</option>
                <option value="TEMPORARY BLOCKED">{t("TEMPORARY BLOCKED")}</option>
                <option value="BLACKLISTED">{t("BLACKLISTED")}</option>
              </select>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <label style={{ fontSize: '13px', color: 'var(--text-secondary)', fontWeight: 500 }}>{t('walletType')}</label>
              <select className="select" value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} style={{ width: '180px' }}>
                <option value="-- Chọn Type --">{t("-- Chọn Type --")}</option>
                <option value="PERSONAL">{t("PERSONAL")}</option>
                <option value="MERCHANT">{t("MERCHANT")}</option>
                <option value="AGENT">{t("AGENT")}</option>
                <option value="SYSTEM">{t("SYSTEM")}</option>
              </select>
            </div>

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <label style={{ fontSize: '13px', color: 'var(--text-secondary)', fontWeight: 500 }}>{t('searchPlaceholder')}</label>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <Search size={16} style={{ position: 'absolute', left: '1rem', color: 'var(--text-secondary)' }} />
                <input 
                  type="text" 
                  className="input w-full" 
                  placeholder={t('searchPlaceholder')} 
                  style={{ width: '100%', paddingLeft: '2.5rem', paddingRight: '2.5rem' }}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {searchTerm && (
                  <button 
                    className="btn-icon" 
                    style={{ position: 'absolute', right: '0.25rem', padding: '0.5rem' }}
                    onClick={() => setSearchTerm('')}
                    title="Xóa tìm kiếm"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Advanced Filter Panel Overlay */}
          {showAdvancedFilter && (
            <div className="advanced-filter-panel" style={{ width: '500px', left: '0', right: 'auto' }}>
              <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <label>{t('walletType')}</label>
                    <select className="select w-full" value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
                      <option value="-- Chọn Type --">{t('-- Chọn Type --')}</option>
                      <option value="PERSONAL">{t('PERSONAL')}</option>
                      <option value="MERCHANT">{t('MERCHANT')}</option>
                      <option value="AGENT">{t('AGENT')}</option>
                      <option value="SYSTEM">{t('SYSTEM')}</option>
                    </select>
                  </div>
                  <div>
                    <label>{t('orgName')}</label>
                    <select className="select w-full" value={filterForm.orgName} onChange={(e) => setFilterForm({...filterForm, orgName: e.target.value})}>
                      <option>-- Chọn Tên đơn vị --</option>
                      <option>Công ty Cổ phần A</option>
                      <option>Tập đoàn B</option>
                    </select>
                  </div>
                  <div>
                    <label>{t('subOrg')}</label>
                    <select className="select w-full" value={filterForm.subOrg} onChange={(e) => setFilterForm({...filterForm, subOrg: e.target.value})}>
                      <option>-- Chọn Đơn vị trực thuộc --</option>
                      <option>Chi nhánh Hà Nội</option>
                      <option>Chi nhánh HCM</option>
                    </select>
                  </div>
                  <div>
                    <label>{t('fullName')}</label>
                    <input type="text" className="input w-full" placeholder="Nhập họ và tên" value={filterForm.fullName} onChange={(e) => setFilterForm({...filterForm, fullName: e.target.value})} />
                  </div>
                  <div>
                    <label>{t('dni')}</label>
                    <input type="text" className="input w-full" placeholder="Nhập số CMND/CCCD" value={filterForm.dni} onChange={(e) => setFilterForm({...filterForm, dni: e.target.value})} />
                  </div>
                  <div>
                    <label>{t('taxId')}</label>
                    <input type="text" className="input w-full" placeholder="Nhập mã số thuế" value={filterForm.taxId} onChange={(e) => setFilterForm({...filterForm, taxId: e.target.value})} />
                  </div>
                  <div>
                    {/* Empty block to align grid */}
                  </div>
                  <div>
                    <label>{t('dateFrom')}</label>
                    <input type="date" className="input w-full" value={filterForm.dateFrom} onChange={(e) => setFilterForm({...filterForm, dateFrom: e.target.value})} />
                  </div>
                  <div>
                    <label>{t('dateTo')}</label>
                    <input type="date" className="input w-full" value={filterForm.dateTo} onChange={(e) => setFilterForm({...filterForm, dateTo: e.target.value})} />
                  </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t" style={{ borderColor: 'var(--border-color)' }}>
                <button 
                  className="btn btn-outline" 
                  onClick={() => setShowAdvancedFilter(false)}
                >
                  Hủy
                </button>
                <button 
                  className="btn btn-primary" 
                  onClick={() => setShowAdvancedFilter(false)}
                >
                  Áp dụng
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
        
      <div className="card shadow-none border-0 bg-transparent">
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th style={{ width: '60px', textAlign: 'center' }}>{t('stt')}</th>
                <th>{t('walletId')}</th>
                <th>{t('typeCategory')}</th>
                <th>{t('owner')}</th>
                <th>{t('dni')}</th>
                <th style={{ textAlign: 'right' }}>{t('balance')}</th>
                <th>{t('status')}</th>
                <th style={{ textAlign: 'center' }}>{t('createdAt')}</th>
                <th style={{ textAlign: 'left', position: 'sticky', right: 0, backgroundColor: 'var(--panel-bg)', zIndex: 10, boxShadow: '-2px 0 5px rgba(0,0,0,0.05)' }}>{t('action')}</th>
              </tr>
            </thead>
            <tbody>
              {paginatedWallets.length > 0 ? (
                paginatedWallets.map((wallet, index) => (
                  <tr 
                    key={wallet.id}  
                    onClick={() => navigate(`/wallet/${wallet.id}`)}
                    style={{ cursor: 'pointer' }}
                    className="hover:bg-gray-50"
                  >
                  <td style={{ textAlign: 'center' }}>
                    <span className="text-sm text-secondary">
                      {(currentPage - 1) * itemsPerPage + index + 1}
                    </span>
                  </td>
                  <td>
                    <span className="font-semibold text-primary" style={{ color: 'var(--primary-color)' }}>{wallet.id}</span>
                  </td>
                  <td>
                    <div className="flex flex-col">
                      <span className="font-semibold text-sm">{t(wallet.type)}</span>
                      <span className="text-xs text-secondary">{wallet.category}</span>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <div className="btn-icon" style={{ padding: '0.25rem', backgroundColor: 'var(--bg-color)' }}>
                        <Users size={14} />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-semibold text-sm">{wallet.ownerName}</span>
                        <span className="text-xs text-secondary">{wallet.contact}</span>
                      </div>
                    </div>
                  </td>
                  <td>{wallet.dni}</td>
                  <td style={{ textAlign: 'right' }}>
                    <div className="flex flex-col items-end">
                      <span className="font-semibold text-sm">{wallet.currency} {wallet.balance}</span>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-1">
                      <span className={`status-badge ${getStatusClass(wallet.status)}`}>
                        {wallet.status}
                      </span>
                      {wallet.status === 'PENDING' && <Info size={14} className="text-secondary" />}
                    </div>
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <span className="text-sm font-medium">{wallet.createdAt}</span>
                  </td>
                  <td style={{ position: 'sticky', right: 0, backgroundColor: 'inherit', zIndex: 9, boxShadow: '-2px 0 5px rgba(0,0,0,0.02)' }}>
                    <div className="flex items-center justify-start gap-2">
                      <button 
                        className="btn btn-outline flex items-center gap-1 font-medium bg-transparent" 
                        style={{ color: 'var(--primary-color)', borderColor: 'var(--primary-light)', padding: '4px 10px', minHeight: '30px' }}
                        title="View Detail"
                        onClick={(e) => { e.stopPropagation(); navigate(`/wallet/${wallet.id}`); }}
                      >
                        <Eye size={14} /> <span style={{ fontSize: '12px' }}>View</span>
                      </button>
                    </div>
                  </td>
                </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="text-center py-12">
                    <div className="flex flex-col items-center justify-center text-secondary">
                      <SearchX size={48} className="mb-4 text-gray-300" style={{ strokeWidth: 1.5 }} />
                      <h3 className="text-lg font-medium text-main mb-1">Không thấy dữ liệu nào</h3>
                      <p className="text-sm">Thử điều chỉnh lại các thuộc tính bộ lọc xem sao!</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        {totalPages > 0 && (
          <div className="flex justify-between items-center p-4 border-t" style={{ borderColor: 'var(--border-color)' }}>
            <div className="flex items-center gap-4">
              <span className="text-sm text-secondary font-medium">Tổng số bản ghi: {totalRecords}</span>
              <select 
                className="select py-1 pl-3 pr-8 text-sm bg-white" 
                value={itemsPerPage} 
                onChange={(e) => setItemsPerPage(Number(e.target.value))}
              >
                <option value={5}>5 / Trang</option>
                <option value={10}>10 / Trang</option>
                <option value={20}>20 / Trang</option>
                <option value={50}>50 / Trang</option>
              </select>
            </div>
            
            <div className="flex gap-1">
              <button 
                className="flex items-center justify-center rounded cursor-pointer" 
                style={{ width: '32px', height: '32px', border: '1px solid var(--border-color)', opacity: currentPage === 1 ? 0.3 : 1, pointerEvents: currentPage === 1 ? 'none' : 'auto' }}
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
              >
                <ChevronsLeft size={16} />
              </button>
              <button 
                className="flex items-center justify-center rounded cursor-pointer" 
                style={{ width: '32px', height: '32px', border: '1px solid var(--border-color)', opacity: currentPage === 1 ? 0.3 : 1, pointerEvents: currentPage === 1 ? 'none' : 'auto', marginRight: '4px' }}
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft size={16} />
              </button>
              
              {getPageNumbers().map((pageNum, index) => (
                pageNum === '...' ? (
                  <span key={`ellipsis-${index}`} className="flex items-center justify-center px-1 text-secondary text-sm font-medium">...</span>
                ) : (
                  <button 
                    key={pageNum}
                    className="flex items-center justify-center rounded text-sm font-medium transition-colors cursor-pointer"
                    style={{ 
                      width: '32px', height: '32px', 
                      border: '1px solid',
                      borderColor: currentPage === pageNum ? 'var(--primary-color)' : 'var(--border-color)',
                      backgroundColor: currentPage === pageNum ? 'var(--primary-color)' : 'var(--panel-bg)',
                      color: currentPage === pageNum ? 'white' : 'var(--text-main)'
                    }}
                    onClick={() => setCurrentPage(pageNum)}
                    onMouseOver={(e) => {
                      if (currentPage !== pageNum) {
                        e.target.style.backgroundColor = 'var(--bg-color)';
                      }
                    }}
                    onMouseOut={(e) => {
                      if (currentPage !== pageNum) {
                        e.target.style.backgroundColor = 'var(--panel-bg)';
                      }
                    }}
                  >
                    {pageNum}
                  </button>
                )
              ))}

              <button 
                className="flex items-center justify-center rounded cursor-pointer" 
                style={{ width: '32px', height: '32px', border: '1px solid var(--border-color)', opacity: currentPage === totalPages ? 0.3 : 1, pointerEvents: currentPage === totalPages ? 'none' : 'auto', marginLeft: '4px' }}
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
              >
                <ChevronRight size={16} />
              </button>
              <button 
                className="flex items-center justify-center rounded cursor-pointer" 
                style={{ width: '32px', height: '32px', border: '1px solid var(--border-color)', opacity: currentPage === totalPages ? 0.3 : 1, pointerEvents: currentPage === totalPages ? 'none' : 'auto' }}
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
              >
                <ChevronsRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WalletList;
