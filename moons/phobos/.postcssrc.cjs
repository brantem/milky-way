module.exports = {
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
    require('postcss-simple-scope')({ scope: '#phobos', selectors: { exclude: ['#root', '#phobos'] } }),
  ],
};
