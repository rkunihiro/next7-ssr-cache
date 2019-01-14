module.exports = {
    presets: [
        ['@babel/preset-env', {
            // loose: true,
            // modules: false,
            targets: {
                // ie: 9,
                node: 8,
            },
            useBuiltIns: 'usage',
        }],
        ['@babel/preset-react'],
    ],
};