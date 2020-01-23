module.exports = {
    presets: [
        ['@babel/preset-env', {
            // loose: true,
            // modules: false,
            targets: {
                // ie: 9,
                node: 12,
            },
            useBuiltIns: 'usage',
            corejs: 3,
            // debug: true,
        }],
        ['@babel/preset-react'],
    ],
};
