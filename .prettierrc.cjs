/** @type {import("prettier").Options} */
const config = {
    plugins: [
        require.resolve('prettier-plugin-astro'),
        require.resolve('prettier-plugin-tailwindcss'),
    ],
    overrides: [
        {
            files: '*.astro',
            options: {
                parser: 'astro',
            },
        },
    ],
    trailingComma: 'es5',
    tabWidth: 4,
    semi: false,
    singleQuote: true,
}

module.exports = config
