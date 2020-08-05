const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const {createCssModuleLoader, createAssetLoader} = require('../webpack.config.babel');

// FOR DEV only, not yet for build (needs some fixes)
module.exports = ({config}) => {
    const cssLoaderIndex = config.module.rules.findIndex(({ test }) => test.toString().includes('css'));
    config.module.rules.splice(cssLoaderIndex, 1);

    // uncomment when adding custom svg loader (eg svgr)
    // const svgLoader = config.module.rules.find(({ test }) => test.toString().includes('svg'));
    //
    // if (svgLoader) {
    //     svgLoader.exclude = /styles(\\|\/)svg/  // for both Win & Linux
    // }

    config.plugins.push(new MiniCssExtractPlugin());

    config.module.rules.push(createAssetLoader());

    config.module.rules.push(
        {
            test: [/\.scss$/, /\.css$/],
            oneOf: [{
                test: /\.module\.scss$/,
                use: createCssModuleLoader(true, true),
            }, {
                use: createCssModuleLoader(true, false),
            }],
        },
    );

    config.resolve.modules.push(path.resolve('./src'));

    return config;
};
