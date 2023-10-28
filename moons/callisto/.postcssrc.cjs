module.exports = {
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
    require('postcss-simple-scope')({ scope: '#callisto', selectors: { exclude: ['#root', '#callisto'] } }),
  ],
};
