module.exports = {
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
    require('postcss-simple-scope')({ scope: '#io', selectors: { exclude: ['#root', '#io'] } }),
  ],
};
