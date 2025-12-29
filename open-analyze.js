const path = require('path');
const open = require('open');
const fs = require('fs');

const analyzePath = path.join(__dirname, '.next', 'analyze', 'client.html');

if (fs.existsSync(analyzePath)) {
  console.log('Opening Bundle Analyzer report...');
  open(analyzePath);
} else {
  console.log('Bundle Analyzer report not found. Make sure ANALYZE=true and build is completed.');
}
