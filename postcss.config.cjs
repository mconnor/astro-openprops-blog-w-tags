const postcssPresetEnv = require('postcss-preset-env')
const postcssNesting = require('postcss-nesting')
const postcssImport = require('postcss-import')


module.exports = {
    plugins: [
        postcssImport,
        postcssNesting,
        postcssPresetEnv({
            /* pluginOptions */
            stage: 2,
            features: {
                'logical-properties-and-values': false,
            },
        }),
    ],
}
