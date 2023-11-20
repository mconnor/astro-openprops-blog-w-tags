const postcssPresetEnv = require('postcss-preset-env')
const postcssNesting = require('postcss-nesting')
const postcssHasPseudo = require('css-has-pseudo');


module.exports = {
    plugins: [
        postcssNesting,
        postcssPresetEnv({
            /* pluginOptions */
            stage: 2,
            features: {
                'logical-properties-and-values': false,
            },
        }),
        postcssHasPseudo
    ],
}
