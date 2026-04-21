const xlsx = require('xlsx');

const filePath = 'c:\\Users\\caidat\\Desktop\\Coding by GA\\CMS\\01_Requirement\\Note elements UI UX_thuyvt.xlsx';
const workbook = xlsx.readFile(filePath);

workbook.SheetNames.forEach(sheetName => {
  console.log(`\n\n--- Sheet: ${sheetName} ---`);
  const sheet = workbook.Sheets[sheetName];
  const data = xlsx.utils.sheet_to_json(sheet, { header: 1 });
  data.forEach((row, i) => {
    if (row.length > 0) {
      console.log(`Row ${i + 1}: ${row.join(' | ')}`);
    }
  });
});
