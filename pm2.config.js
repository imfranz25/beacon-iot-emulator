module.exports = {
  apps: [
    {
      name: "beacon-service",
      script: "index.js",
      watch: false,
      instances: 1,
      autorestart: true,
      max_memory_restart: "1G",
      log_date_format: "YYYY-MM-DD HH:mm:ss",
      error_file: "logs/error.log",
      out_file: "logs/out.log",
      merge_logs: true,
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
