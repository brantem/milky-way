const fs = require('node:fs');
const path = require('node:path');

// https://github.com/microsoft/onnxjs/blob/master/docs/migration-to-ort-web.md#step6---deploy

const a = path.join(__dirname, 'node_modules', 'onnxruntime-web', 'dist');
const b = path.join(__dirname, 'public');

fs.copyFileSync(path.join(a, 'ort-wasm.wasm'), path.join(b, 'ort-wasm.wasm'));
fs.copyFileSync(path.join(a, 'ort-wasm-simd.wasm'), path.join(b, 'ort-wasm-simd.wasm'));
fs.copyFileSync(path.join(a, 'ort-wasm-threaded.wasm'), path.join(b, 'ort-wasm-threaded.wasm'));
fs.copyFileSync(path.join(a, 'ort-wasm-simd-threaded.wasm'), path.join(b, 'ort-wasm-simd-threaded.wasm'));
