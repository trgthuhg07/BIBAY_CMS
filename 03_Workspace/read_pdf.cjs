const fs = require('fs');

async function run() {
    const importData = await import('pdf-parse');
    const pdf = importData.default ? importData.default : importData;
    
    const filePath = 'c:\\Users\\caidat\\Desktop\\Coding by GA\\CMS\\02_Design\\Bản sao của Note elements UI UX_Bipay.xlsx - Web elements.pdf';
    const dataBuffer = fs.readFileSync(filePath);

    try {
        let fn = typeof pdf === 'function' ? pdf : (pdf.default || pdf.PDFParse);
        if (typeof fn !== 'function') throw new Error("not fn");
        const data = await fn(dataBuffer);
        console.log("TEXT START");
        console.log(data.text);
        console.log("TEXT END");
    } catch(e) {
        console.log(e);
    }
}
run();
