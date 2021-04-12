module.exports = function (api) {
    // api.cache.using(() => process.env.NODE_ENV);

    const presets = [
        [
            "@babel/preset-env",
            {
                useBuiltIns: "usage",
                corejs: 3
            }
        ],
        "@babel/preset-react"
    ];

    let plugins = [
        "@babel/plugin-transform-react-jsx",
        "@babel/plugin-proposal-function-bind",
        "@babel/plugin-proposal-export-default-from",
        ["@babel/plugin-proposal-decorators", { legacy: true }],
        ["@babel/plugin-proposal-class-properties", { loose: true }]
    ];

    if (api.env("production")) {
        // console.log('[babel.config.js] Production environment');
        // plugins.push('@babel/plugin-transform-react-inline-elements');
    }

    return {
        presets,
        plugins
    };
};
