const config = {
  apps: [
    {
      name: 'app',
      script: './index.js',
      max_memory_restart: '50M',
      exec_mode: 'cluster',
      instances: 'max',
      merge_logs: true,
    },
  ],
};

module.exports = config;
