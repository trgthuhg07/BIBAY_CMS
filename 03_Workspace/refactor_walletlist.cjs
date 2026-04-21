const fs = require('fs');
let code = fs.readFileSync('src/pages/wallet/WalletList.jsx', 'utf8');

// 1. Imports
code = code.replace(
  "import { DUMMY_WALLETS, getStatusClass } from '../../utils/dummyData';",
  "import { DUMMY_WALLETS, getStatusClass } from '../../utils/dummyData';\nimport { useLanguage } from '../../context/LanguageContext';\nimport { useTranslation } from '../../locales/translations';"
);

// 2. Add Hooks
code = code.replace(
  "const navigate = useNavigate();",
  "const navigate = useNavigate();\n  const { language } = useLanguage();\n  const t = useTranslation(language);"
);

// 3. Update defaults
code = code.replace(/useState\('-- Chọn trạng thái --'\)/g, "useState('-- Chọn Status --')");
code = code.replace(/useState\('-- Chọn loại --'\)/g, "useState('-- Chọn Type --')");
code = code.replace(/statusFilter !== '-- Chọn trạng thái --'/g, "statusFilter !== '-- Chọn Status --'");
code = code.replace(/typeFilter !== '-- Chọn loại --'/g, "typeFilter !== '-- Chọn Type --'");

// 4. Texts in Header
code = code.replace(">Danh sách Ví<", ">{t('walletListTitle')}<");
code = code.replace(">Đã tìm thấy {filteredWallets.length} ví<", ">{filteredWallets.length} {t('walletsFound')}<");
code = code.replace(">Làm mới<", ">{t('refresh')}<");
code = code.replace(">Xuất Excel<", ">{t('export')}<");

// 5. Filter labels
code = code.replace(/<span>Bộ lọc<\/span>/g, "<span>{t('moreFilters')}</span>");
code = code.replace(/>Xóa bộ lọc</g, ">{t('clearFilters')}<");
code = code.replace(/>Trạng thái</g, ">{t('status')}<");
code = code.replace(/>Loại đơn vị</g, ">{t('walletType')}<");
code = code.replace(/placeholder="Nhập Mã Ví, Số ĐT, CMND, MST..."/g, "placeholder={t('searchPlaceholder')}");
code = code.replace(/>Từ khóa tìm kiếm</g, ">{t('searchPlaceholder')}<");

// Advanced filter panel texts
code = code.replace(/>Tên đơn vị</g, ">{t('orgName')}<");
code = code.replace(/>Đơn vị trực thuộc</g, ">{t('subOrg')}<");
code = code.replace(/>Họ và tên</g, ">{t('fullName')}<");
code = code.replace(/>Số CMND\/CCCD</g, ">{t('dni')}<");
code = code.replace(/>Mã số thuế</g, ">{t('taxId')}<");
code = code.replace(/>Từ ngày</g, ">{t('dateFrom')}<");
code = code.replace(/>Đến ngày</g, ">{t('dateTo')}<");
code = code.replace(/>Hủy</g, ">{t('cancel')}<");
code = code.replace(/>Áp dụng</g, ">{t('apply')}<");

// Select options logic
function replaceOptions(text, options) {
    for (const opt of options) {
        text = text.replace(new RegExp(`<option>${opt}</option>`, 'g'), `<option value="${opt}">{t('${opt}')}</option>`);
    }
    return text;
}
code = replaceOptions(code, ['-- Chọn Status --', 'ACTIVE', 'PENDING', 'TEMPORARY BLOCKED', 'BLACKLISTED']);
code = replaceOptions(code, ['-- Chọn Type --', 'PERSONAL', 'MERCHANT', 'AGENT', 'SYSTEM']);
code = code.replace(/<option>-- Chọn trạng thái --<\/option>/g, '<option value="-- Chọn Status --">{t("-- Chọn Status --")}</option>');
code = code.replace(/<option>Hoạt động<\/option>/g, '<option value="ACTIVE">{t("ACTIVE")}</option>');
code = code.replace(/<option>Chờ duyệt<\/option>/g, '<option value="PENDING">{t("PENDING")}</option>');
code = code.replace(/<option>Khóa tạm thời<\/option>/g, '<option value="TEMPORARY BLOCKED">{t("TEMPORARY BLOCKED")}</option>');
code = code.replace(/<option>Danh sách đen<\/option>/g, '<option value="BLACKLISTED">{t("BLACKLISTED")}</option>');

code = code.replace(/<option>-- Chọn loại --<\/option>/g, '<option value="-- Chọn Type --">{t("-- Chọn Type --")}</option>');
code = code.replace(/<option>Cá nhân<\/option>/g, '<option value="PERSONAL">{t("PERSONAL")}</option>');
code = code.replace(/<option>Đơn vị bán hàng<\/option>/g, '<option value="MERCHANT">{t("MERCHANT")}</option>');
code = code.replace(/<option>Đại lý<\/option>/g, '<option value="AGENT">{t("AGENT")}</option>');
code = code.replace(/<option>Hệ thống<\/option>/g, '<option value="SYSTEM">{t("SYSTEM")}</option>');

// Table columns
code = code.replace(/>STT</g, ">{t('stt')}<");
code = code.replace(/>Mã Ví</g, ">{t('walletId')}<");
code = code.replace(/>Phân loại</g, ">{t('typeCategory')}<");
code = code.replace(/>Chủ sở hữu</g, ">{t('owner')}<");
code = code.replace(/>CMND \/ MST</g, ">{t('dni')}<");
code = code.replace(/>Số dư \(VNĐ\)</g, ">{t('balance')}<");
code = code.replace(/>Ngày tạo</g, ">{t('createdAt')}<");
code = code.replace(/>Thao tác</g, ">{t('action')}<");

// Table data rendering
code = code.replace(/>{wallet.type}</g, ">{t(wallet.type)}<");
code = code.replace(/>{wallet.status}</g, ">{t(wallet.status)}<");

// PENDING checking Info icon
code = code.replace(/wallet.status === 'Chờ duyệt'/g, "wallet.status === 'PENDING'");

fs.writeFileSync('src/pages/wallet/WalletList.jsx', code);
