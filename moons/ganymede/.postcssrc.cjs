module.exports = {
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
    require('postcss-simple-scope')({ scope: '#ganymede', selectors: { exclude: ['#root', '#ganymede'] } }),
  ],
};
