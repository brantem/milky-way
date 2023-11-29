module.exports = {
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
    require('postcss-simple-scope')({ scope: '[id^=phobos]', selectors: { exclude: ['#root', '#phobos'] } }),
  ],
};
