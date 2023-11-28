module.exports = {
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
    require('postcss-simple-scope')({ scope: '[id^=callisto]', selectors: { exclude: ['#root', '#callisto'] } }),
  ],
};
