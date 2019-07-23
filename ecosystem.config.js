const config = {
  apps: [
    {
      name: 'gpio',
      script: './gpio',
      max_memory_restart: '256M',
      merge_logs: true,
    },
    {
      name: 'grow-lights',
      script: './grow-lights',
      max_memory_restart: '256M',
      merge_logs: true,
    },
    {
      name: 'hygrometer',
      script: './hygrometer',
      max_memory_restart: '128M',
      merge_logs: true,
    },
  ],
};

module.exports = config;
