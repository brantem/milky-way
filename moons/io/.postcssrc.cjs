module.exports = {
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
    require('postcss-simple-scope')({ scope: '[id^=io]', selectors: { exclude: ['#root', '#io'] } }),
  ],
};
