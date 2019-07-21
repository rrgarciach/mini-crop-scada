const config = {
  apps: [
    {
      name: 'device',
      script: './index.js',
      max_memory_restart: '50M',
      merge_logs: true,
    },
  ],
};

module.exports = config;
