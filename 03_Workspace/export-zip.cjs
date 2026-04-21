const fs = require('fs');
const archiver = require('archiver');
const path = require('path');

const output = fs.createWriteStream(path.join(__dirname, '..', 'BiPay_CMS_SourceCode.zip'));
const archive = archiver('zip', {
  zlib: { level: 9 } // Sets the compression level.
});

output.on('close', function() {
  console.log(`[OK] Đã đóng gói thành công file BiPay_CMS_SourceCode.zip (${(archive.pointer() / 1024 / 1024).toFixed(2)} MB)`);
});

archive.on('error', function(err) {
  throw err;
});

archive.pipe(output);

// Thêm các thư mục cần thiết
archive.glob('**/*', {
  cwd: __dirname,
  ignore: ['node_modules/**', 'dist/**', '.git/**', '.idea/**', '.DS_Store', 'BiPay_CMS_SourceCode.zip']
});

archive.finalize();
