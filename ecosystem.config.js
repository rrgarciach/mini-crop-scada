const config = {
  apps: [
    {
      name: 'gpio',
      script: './gpio.js',
      max_memory_restart: '256M',
      merge_logs: true,
    },
    {
      name: 'grow-lights',
      script: './grow-lights.js',
      max_memory_restart: '256M',
      merge_logs: true,
    },
    {
      name: 'hygrometer',
      script: './hygrometer.js',
      max_memory_restart: '128M',
      merge_logs: true,
    },
  ],
};

module.exports = config;
