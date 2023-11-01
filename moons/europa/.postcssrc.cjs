module.exports = {
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
    require('postcss-simple-scope')({ scope: '#europa', selectors: { exclude: ['#root', '#europa'] } }),
  ],
};
