const config = {
  apps: [
    {
      name: 'gpio',
      script: './src/devices/gpio',
      max_memory_restart: '512M',
      merge_logs: true,
    },
    {
      name: 'hygrometer',
      script: './src/devices/hygrometer',
      max_memory_restart: '512M',
      merge_logs: true,
    },
  ],
};

module.exports = config;
