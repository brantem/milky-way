module.exports = {
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
    require('postcss-simple-scope')({ scope: '#deimos', selectors: { exclude: ['#root', '#deimos'] } }),
  ],
};
