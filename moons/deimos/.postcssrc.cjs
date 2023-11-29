module.exports = {
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
    require('postcss-simple-scope')({ scope: '[id^=deimos]', selectors: { exclude: ['#root', '#deimos'] } }),
  ],
};
