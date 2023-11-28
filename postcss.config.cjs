const postcssPresetEnv = require('postcss-preset-env')
const postcssNesting = require('postcss-nesting')



module.exports = {
    plugins: [

        postcssNesting,
        postcssPresetEnv({
            /* pluginOptions */
            stage: 2,
            features: {
                'logical-properties-and-values': false,
            },
        })
    ],
}
