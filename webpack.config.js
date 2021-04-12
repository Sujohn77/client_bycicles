const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
const webpack = require("webpack");

// PostCSS
const autoprefixer = require("autoprefixer");

const sassIncludePaths = [path.resolve(__dirname, "./src/scss")];

module.exports = {
    entry: path.resolve(__dirname, "./src/index.js"),
    mode: "development",
    devtool: "source-map",
    output: {
        path: path.resolve(__dirname, "dist"),
        publicPath: "/dist/",
        filename: "bundle.js"
    },
    devServer: {
        contentBase: path.join(__dirname, "public"),
        compress: true,
        port: 3000,
        watchContentBase: true,
        progress: true,
        headers: {
            "Access-Control-Allow-Origin": "*"
        }
    },
    resolve: {
        fallback: {
            fs: false,
            tls: false,
            net: false,
            path: false,
            zlib: false,
            http: false,
            https: false,
            stream: false,
            crypto: false
        },
        extensions: [".js", ".jsx", ".json"],
        modules: ["node_modules", "src", "public"]
    },
    module: {
        rules: [
            // React jsx | Babel es16 etc
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            cacheDirectory: false
                        }
                    }
                ]
            },

            {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader"
                    }
                ]
            },
            // Bundle SASS global styles
            {
                test: /\.scss$/,
                exclude: /\.module\.scss$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: true,
                            importLoaders: 1
                        }
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            sassOptions: {
                                includePaths: sassIncludePaths
                            },

                            sourceMap: true
                        }
                    }
                ]
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: "asset/resource"
            },
            // Bundle SASS modules
            {
                test: /\.scss$/,
                include: /\.module\.scss$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    // MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            modules: {
                                mode: "local",
                                localIdentName: "[local]--[hash:base64:5]"
                            },
                            sourceMap: true,
                            importLoaders: 2
                        }
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            sourceMap: true,
                            ident: "postcss",
                            plugins: function () {
                                return [autoprefixer()];
                            }
                        }
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            sassOptions: {
                                includePaths: sassIncludePaths
                            },
                            sourceMap: true
                        }
                    }
                ]
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                type: "asset/resource"
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./public/index.html"
        })
        // new MiniCssExtractPlugin({
        //     filename: "css/[name].[contenthash].css",
        //     chunkFilename: "css/[id].[contenthash].css"
        // })
        // new webpack.DefinePlugin({
        //     "process.env.NODE_ENV": JSON.stringify("development")
        // })
    ]
};
