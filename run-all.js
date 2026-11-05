const { spawn } = require('child_process');
const path = require('path');

console.log('====================================================');
console.log('👟 Starting Shoes Store (Firebase Backend + Vite React)...');
console.log('🔥 Firebase Project: stepup-shoes-store-2bd6b');
console.log('🌐 Frontend:         http://localhost:5173');
console.log('====================================================');

// Start Frontend
const frontend = spawn(/^win/.test(process.platform) ? 'npm.cmd' : 'npm', ['run', 'dev'], {
  cwd: path.join(__dirname, 'frontend'),
  stdio: 'inherit',
  shell: true
});

process.on('SIGINT', () => {
  frontend.kill();
  process.exit();
});
