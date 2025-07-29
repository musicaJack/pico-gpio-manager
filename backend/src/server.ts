import app from './app';
import { SERVER_CONFIG } from './config/constants';

const server = app.listen(SERVER_CONFIG.port, () => {
  console.log(`🚀 Server running on port ${SERVER_CONFIG.port}`);
  console.log(`📊 Health check: http://localhost:${SERVER_CONFIG.port}/health`);
  console.log(`🔧 API docs: http://localhost:${SERVER_CONFIG.port}/api`);
});

// 优雅关闭
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  server.close(() => {
    console.log('Process terminated');
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully');
  server.close(() => {
    console.log('Process terminated');
  });
});

export default server; 