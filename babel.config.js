module.exports = {
    presets: [
        '@babel/preset-env', // Preset to compile ES2015+ syntax
        '@babel/preset-react' // Preset for React to transform JSX into JavaScript
    ],
    plugins: [
        '@babel/plugin-transform-runtime' // This plugin transforms the runtime environment
    ]
};
