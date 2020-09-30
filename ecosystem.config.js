module.exports = {
  apps : [{
    name: 'hack4openglam-visualization',
    script: 'server.js',
    env: {
      "NODE_ENV": "PRODUCTION",
      "PORT": "8128",
    },
    env_hook: {
      command: 'pm2 pull hack4openglam-visualization'
    }
  }]
};
