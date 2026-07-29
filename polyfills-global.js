// src/polyfills-global.js
window.global = window;
window.process = { env: {} };

// Si crypto est nécessaire
if (typeof window.crypto === "undefined") {
  window.crypto = require("crypto-browserify");
}
