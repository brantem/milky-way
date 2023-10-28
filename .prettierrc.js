/** @type {import('prettier').Config} */
module.exports = {
  plugins: ['prettier-plugin-astro'],
  overrides: [
    {
      files: '*.astro',
      options: {
        parser: 'astro',
      },
    },
  ],
  printWidth: 120,
  singleQuote: true,
  trailingComma: 'all',
};
