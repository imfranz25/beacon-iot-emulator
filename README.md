# Start your application

pm2 start pm2.config.js

pm2 list # List all processes
pm2 logs # Display logs
pm2 logs beacon-service # Display specific app logs
pm2 monit # Monitor CPU/Memory
pm2 reload beacon-service # Zero-downtime reload
pm2 stop beacon-service # Stop the service
pm2 delete beacon-service # Remove from PM2

# Start on system boot

pm2 startup # Generate startup script
pm2 save # Save current process list
