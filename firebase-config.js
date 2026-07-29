/* =============================================
   Firebase Configuration - سؤال وجواب
   ============================================= */

// =============================================
// 🔥 FIREBASE PROJECT CONFIG
// Project: Soal Jawab (soal-jawab)
// Configured by: You ✅
// =============================================
window.FIREBASE_CONFIG = {
  apiKey: 'AIzaSyAKiYJv4oy7c_XlOzhXD12MtuhPV_RnsWg',
  authDomain: 'soal-jawab.firebaseapp.com',
  projectId: 'soal-jawab',
  storageBucket: 'soal-jawab.firebasestorage.app',
  messagingSenderId: '997556854085',
  appId: '1:997556854085:web:fc9fcefe8ee63b5e9ef22c',
  measurementId: 'G-QMDTXYC26Z'
};

// =============================================
// ✅ FIREBASE IS CONFIGURED & READY
// This flag tells script.js that Firebase is fully configured
// =============================================
window.FIREBASE_IS_CONFIGURED = true;

// =============================================
// 🔑 DISCORD OAUTH
// =============================================

window.DISCORD_CLIENT_ID = '1531122882074378331';

// =============================================
// AUTO-DETECT: Discord is ready
// =============================================

window.DISCORD_IS_CONFIGURED = (
  window.DISCORD_CLIENT_ID &&
  window.DISCORD_CLIENT_ID !== 'YOUR_DISCORD_CLIENT_ID'
);

console.log(
  '%c💬 Discord OAuth Config Loaded ✅',
  'color:#5865F2;font-size:16px;font-weight:bold'
);