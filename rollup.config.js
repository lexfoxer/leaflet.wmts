import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import uglify from 'rollup-plugin-uglify-es';

const inputFile = './src/leaflet.wmts.js';

/**
 * Browser + Node.js
 */
const umdConfig = {
  input: inputFile,
  output: {
    file: 'dist/leaflet.wmts.js',
    format: 'umd',
    name: 'leaflet.wmts',
  },
  plugins: [
    commonjs(),
    resolve(),
  ],
};


/**
 * Browser + Node.js minimize
 */
const umdConfigMin = {
  input: inputFile,
  output: {
    file: 'dist/leaflet.wmts.min.js',
    format: 'umd',
    name: 'leaflet.wmts',
  },
  plugins: [
    commonjs(),
    resolve(),
    uglify(),
  ],
};


/**
 * For browsers
 */
const esmConfig = {
  input: inputFile,
  output: {
    file: 'dist/leaflet.wmts.browser.js',
    format: 'esm',
    name: 'leaflet.wmts',
  },
  plugins: [
    commonjs(),
    resolve(),
  ],
};

/**
 * For browsers minimize
 */
const esmConfigMin = {
  input: inputFile,
  output: {
    file: 'dist/leaflet.wmts.browser.min.js',
    format: 'esm',
    name: 'leaflet.wmts',
  },
  plugins: [
    commonjs(),
    resolve(),
    uglify(),
  ],
};

export default [
  umdConfig,
  umdConfigMin,

  esmConfig,
  esmConfigMin,
];
