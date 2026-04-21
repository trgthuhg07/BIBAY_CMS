export const translations = {
  en: {
    // Wallet List Headers
    walletListTitle: "Wallet List",
    walletsFound: "wallets found",
    refresh: "Refresh",
    export: "Export",
    moreFilters: "Advanced Filter",
    clearFilters: "Clear Filters",
    
    // Filter Labels
    status: "Status",
    walletType: "Wallet Type",
    searchPlaceholder: "Wallet ID, Phone, DNI, RUC",
    
    // Advanced Filter
    orgName: "Organization",
    subOrg: "Sub Organization",
    fullName: "Full Name",
    dni: "DNI / RUC",
    taxId: "Tax ID",
    dateFrom: "Date From",
    dateTo: "Date To",
    cancel: "Cancel",
    apply: "Apply",
    
    // Table Headers
    stt: "No.",
    walletId: "Wallet ID",
    typeCategory: "Type / Category",
    owner: "Owner",
    balance: "Balance (S/)",
    createdAt: "Created At",
    action: "Action",
    emptyData: "No data found",
    emptyDesc: "Try adjusting your filter criteria",

    // Status & Types (Mapping)
    'ACTIVE': "Active",
    'PENDING': "Pending",
    'TEMPORARY BLOCKED': "Temp Blocked",
    'BLACKLISTED': "Blacklisted",
    'PERSONAL': "Personal",
    'MERCHANT': "Merchant",
    'AGENT': "Agent",
    'SYSTEM': "System",
    '-- Chọn Status --': "-- Select Status --",
    '-- Chọn Type --': "-- Select Type --",
    '-- Chọn Tên đơn vị --': "-- Org Name --",
    '-- Chọn Đơn vị trực thuộc --': "-- Sub Org --"
  },
  vi: {
    walletListTitle: "Danh sách Ví",
    walletsFound: "ví được tìm thấy",
    refresh: "Làm mới",
    export: "Xuất Excel",
    moreFilters: "Lọc nâng cao",
    clearFilters: "Xóa bộ lọc",
    
    status: "Trạng thái",
    walletType: "Loại đơn vị",
    searchPlaceholder: "Mã Ví, Số ĐT, CMND, MST...",
    
    orgName: "Tên đơn vị",
    subOrg: "Đơn vị trực thuộc",
    fullName: "Họ và tên",
    dni: "Số CMND/CCCD",
    taxId: "Mã số thuế",
    dateFrom: "Từ ngày",
    dateTo: "Đến ngày",
    cancel: "Hủy",
    apply: "Áp dụng",
    
    stt: "STT",
    walletId: "Mã Ví",
    typeCategory: "Phân loại",
    owner: "Chủ sở hữu",
    balance: "Số dư (S/)",
    createdAt: "Ngày tạo",
    action: "Thao tác",
    emptyData: "Không thấy dữ liệu nào",
    emptyDesc: "Thử điều chỉnh lại các thuộc tính bộ lọc xem sao!",

    'ACTIVE': "Hoạt động",
    'PENDING': "Chờ duyệt",
    'TEMPORARY BLOCKED': "Khóa tạm thời",
    'BLACKLISTED': "Danh sách đen",
    'PERSONAL': "Cá nhân",
    'MERCHANT': "Đơn vị bán hàng",
    'AGENT': "Đại lý",
    'SYSTEM': "Hệ thống",
    '-- Chọn Status --': "-- Chọn trạng thái --",
    '-- Chọn Type --': "-- Chọn loại --",
    '-- Chọn Tên đơn vị --': "-- Chọn Tên đơn vị --",
    '-- Chọn Đơn vị trực thuộc --': "-- Chọn Đơn vị TT --"
  },
  es: {
    walletListTitle: "Lista de Billeteras",
    walletsFound: "billeteras encontradas",
    refresh: "Actualizar",
    export: "Exportar",
    moreFilters: "Filtro Avanzado",
    clearFilters: "Limpiar",
    
    status: "Estado",
    walletType: "Tipo de Billetera",
    searchPlaceholder: "ID Billetera, Teléfono, DNI",
    
    orgName: "Organización",
    subOrg: "Sub Organización",
    fullName: "Nombre Completo",
    dni: "DNI / RUC",
    taxId: "RUC",
    dateFrom: "Desde",
    dateTo: "Hasta",
    cancel: "Cancelar",
    apply: "Aplicar",
    
    stt: "N°",
    walletId: "ID Billetera",
    typeCategory: "Tipo / Categoría",
    owner: "Titular",
    balance: "Saldo (S/)",
    createdAt: "Creado",
    action: "Acción",
    emptyData: "No hay datos",
    emptyDesc: "Intente cambiar el filtro",

    'ACTIVE': "Activo",
    'PENDING': "Pendiente",
    'TEMPORARY BLOCKED': "Bloqueado Temp",
    'BLACKLISTED': "Lista Negra",
    'PERSONAL': "Personal",
    'MERCHANT': "Comercio",
    'AGENT': "Agente",
    'SYSTEM': "Sistema",
    '-- Chọn Status --': "-- Estado --",
    '-- Chọn Type --': "-- Tipo --",
    '-- Chọn Tên đơn vị --': "-- Org --",
    '-- Chọn Đơn vị trực thuộc --': "-- Sub Org --"
  }
};

export const useTranslation = (language) => {
  return (key) => {
    if (!translations[language]) return key;
    return translations[language][key] || key;
  };
};
