const fs = require('fs');
const path = require('path');

// Configuration
const INDEX_FILE = path.join(process.argv[2] || '.', 'index.html');
const SOURCE_REPORT = process.argv[3] || 'cypress/reports/staging/report.html';
const MAX_REPORTS = 7;

// Extract timestamp from report file name
function extractTimestamp(filename) {
  const match = filename.match(/report_(\d{4}-\d{2}-\d{2})_(\d{2})-(\d{2})-(\d{2})\.html/);
  if (!match) return null;
  // match[1]: YYYY-MM-DD, match[2]: HH, match[3]: MM, match[4]: SS
  const isoString = `${match[1]}T${match[2]}:${match[3]}:${match[4]}`;
  return new Date(isoString);
}

// Step 1: Copy the new report to the target directory with the same name
const reportDir = path.dirname(INDEX_FILE);
const newReportName = path.basename(SOURCE_REPORT);
const newReportPath = path.join(reportDir, newReportName);

fs.copyFileSync(SOURCE_REPORT, newReportPath);
console.log(`✅ Copied new report as ${newReportName}`);

// Step 2: Scan all report_*.html files
let allReports = fs.readdirSync(reportDir)
  .filter(f => /^report_\d{4}-\d{2}-\d{2}_\d{2}-\d{2}-\d{2}\.html$/.test(f))
  .map(name => ({
    name,
    timestamp: extractTimestamp(name),
    path: path.join(reportDir, name)
  }))
  .filter(r => r.timestamp) // remove invalid files
  .sort((a, b) => b.timestamp - a.timestamp); // newest first

// Step 3: Delete old reports if exceeding MAX_REPORTS
allReports.slice(MAX_REPORTS).forEach(r => {
  fs.unlinkSync(r.path);
  console.log(`🗑️ Removed old report: ${r.name}`);
});

// Step 4: Generate HTML <li> list items for latest reports
const reportListHtml = allReports.slice(0, MAX_REPORTS).map((r, i) => {
  const readable = r.timestamp.toISOString().replace('T', ' ').replace(/\..+/, '');
  const highlight = i === 0 ? ' style="font-weight: bold; background: #d1ecf1;"' : '';
  return `
        <li class="report-item"${highlight}>
            <a href="${r.name}" class="report-link">${r.name}</a>
            <div class="timestamp">Generated on: ${readable}</div>
        </li>`;
}).join('\n');

// Step 5: Read index.html and replace content between <!-- REPORTS_START --> and <!-- REPORTS_END -->
let indexHtml = fs.readFileSync(INDEX_FILE, 'utf-8');
const updatedHtml = indexHtml.replace(
  /<!-- REPORTS_START -->([\s\S]*?)<!-- REPORTS_END -->/,
  `<!-- REPORTS_START -->\n${reportListHtml}\n        <!-- REPORTS_END -->`
);

// Step 6: Write the updated index.html back to disk
fs.writeFileSync(INDEX_FILE, updatedHtml, 'utf-8');
console.log(`✅ Updated index.html with latest ${Math.min(MAX_REPORTS, allReports.length)} reports.`);
