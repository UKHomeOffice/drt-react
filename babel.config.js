module.exports = {
    presets: [
      ['@babel/preset-env', {targets: {node: 'current'}}],
      "@babel/preset-react",
      "@babel/preset-typescript"
    ],
    env: {
      testing: {
        presets: [
          [ "@babel/preset-env", { targets: { node: 'current' }}],
        ]
      }
    }
};
