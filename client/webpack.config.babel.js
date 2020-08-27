const path = require('path');
const fs = require("fs");
const webpack = require('webpack');
const sass = require('sass');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const GitRevisionPlugin = require('git-revision-webpack-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const {BundleAnalyzerPlugin} = require("webpack-bundle-analyzer");
const dotenv = require('dotenv');

const PROFILE = false;

const gitRevisionPlugin = new GitRevisionPlugin();
const smp = PROFILE ? new SpeedMeasurePlugin() : {wrap: (x) => x};

const proxyFile = "./proxy.config.js";
let createProxy = null;
if (fs.existsSync(proxyFile)) {
    createProxy = require(proxyFile);
}

const propagateEnvVariables = (env) => (
    env ? Object.keys(env).reduce((prev, next) => {
        // Only keys with prefix "REACT_APP_" will be visible from inside application
        if (next.startsWith("REACT_APP_")) {
            // eslint-disable-next-line no-param-reassign
            prev[`process.env.${next}`] = JSON.stringify(env[next]);
        }
        return prev;
    }, {}) : {}
);

const array = (...target) => target.filter(Boolean);
module.exports.default = ({devserver, devserverRemote}) => {
    // call dotenv and it will return an Object with a parsed key
    const env = dotenv.config().parsed;

    return smp.wrap({
        entry: {
            main: "./src/index.js",
            ...(devserver ? {} : {message: "./src/index.message.js"}),
        },
        stats: 'errors-warnings',
        devtool: devserver ? "cheap-module-source-map" : "source-map",
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: devserver ? '[name].js' : '[name].[chunkhash].js',
            publicPath: "/",
        },
        optimization: {
            minimizer: [
                new TerserPlugin({
                    sourceMap: true,
                    cache: true,
                    parallel: true,
                    extractComments: false,
                    terserOptions: {
                        mangle: true,
                        compress: {},
                        output: {
                            comments: false,
                        },
                    },
                }),
                new OptimizeCssAssetsPlugin({}),
            ],
            splitChunks: {
                cacheGroups: {
                    styles: {
                        name: 'styles',
                        test(module) {
                            return module.type === 'css/mini-extract';
                        },
                        chunks: 'all',
                        enforce: true,
                    },
                    vendors: {
                        test: path.resolve(__dirname, 'node_modules'),
                        // include only those libraries which are needed by 2 or more dynamic chunks (or the main -- initial -- chunk)
                        name: (module, chunks) => ((chunks.length === 1 && chunks[0].name !== 'main') ? chunks[0].name : 'vendors'),
                        chunks: 'all',
                        enforce: true,
                    },
                    core: {
                        test: path.resolve(__dirname, 'src/core'),
                        name: 'core',
                        chunks: 'all',
                    },
                },
            },
        },
        plugins: array(
            new HtmlWebpackPlugin({
                template: devserver ? "./src/index.dev.html" : "./src/index.prod.html",
                filename: 'index.html',
                favicon: "./src/favicon.ico",
                publicPath: path.resolve(__dirname, "public"),
                chunksSortMode: "none", // https://github.com/marcelklehr/toposort/issues/20
            }),
            new webpack.DefinePlugin({
                VERSION: {
                    VERSION: JSON.stringify(gitRevisionPlugin.version()),
                    HASH: JSON.stringify(gitRevisionPlugin.commithash()),
                    DATE: new Date().getTime(),
                },
                ...propagateEnvVariables(env),
            }),
            new CircularDependencyPlugin({
                exclude: /node_modules/,
                failOnError: true,
            }),
            new MiniCssExtractPlugin({
                filename: "[name]-[contenthash].css",
                ignoreOrder: true,
            }),
            !devserver && new BundleAnalyzerPlugin({
                analyzerMode: 'static',
                openAnalyzer: false,
            }),
        ),
        module: {
            rules: array(
                createJsLoader(devserver),
                createYamlLoader(devserver),
                {
                    test: [/\.scss$/, /\.css$/],
                    oneOf: [{
                        test: /\.module\.scss$/,
                        use: createCssModuleLoader(devserver, true),
                    }, {
                        use: createCssModuleLoader(devserver, false),
                    }],
                },
                createAssetLoader(),
            ),
        },
        resolve: {
            modules: ["src", "node_modules"],
            extensions: ['.js', '.jsx'],
            alias: {
                // due to broken linking react hooks
                // https://github.com/facebook/react/issues/13991#issuecomment-463486871
                react: path.resolve(path.join(__dirname, './node_modules/react')),
            },
        },
        devServer: {
            inline: true,
            port: 3000,
            proxy: createProxy ? createProxy(devserverRemote) : undefined,
            disableHostCheck: true,
            historyApiFallback: true,
        },
    });
};

const createJsLoader = () => ({
    test: [/\.js$/, /\.jsx$/],
    include: path.resolve(__dirname, "src"),
    sideEffects: false,
    use: {
        loader: "babel-loader",
        options: {
            cacheDirectory: true,
        },
    },
});

const createYamlLoader = () => ({
    test: /\.yaml/,
    include: path.resolve(__dirname, "src", 'translations'),
    loader: ['json-loader', 'yaml-loader'],
});

const createCssModuleLoader = (dev, isModule = false) => ([
    {
        loader: MiniCssExtractPlugin.loader,
        options: {
            hmr: dev,
            reloadAll: dev,
        },
    }, {
        loader: 'css-loader',
        options: {
            modules: isModule ? {
                localIdentName: '[name]__[local]--[hash:base64:5]',
            } : undefined,
            sourceMap: dev,
            importLoaders: 2,
        },
    }, {
        loader: 'postcss-loader',
    }, {
        loader: 'resolve-url-loader',
        options: {
            sourceMap: dev,
        },
    }, {
        loader: 'sass-loader',
        options: {
            // we need to build source maps on prod because resolve-url-loader uses them to rewrite asset paths
            sourceMap: true,
            implementation: sass,
            sassOptions: {
                includePaths: [
                    path.resolve(__dirname, 'node_modules'),
                ],
            },
        },
    },
]);

const createAssetLoader = () => ({
    test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|otf|eot)$/,
    loader: 'file-loader',
    options: {
        name: 'assets/[name]-[hash].[ext]',
    },
});

module.exports.createCssModuleLoader = createCssModuleLoader;
module.exports.createAssetLoader = createAssetLoader;
