import express from 'express';
import cors from 'cors';
import boardRoutes from './routes/boardRoutes';

const app = express();

// 中间件
app.use(cors());
app.use(express.json());

// 路由
app.use('/api/boards', boardRoutes);

// 健康检查端点
app.get('/health', (_req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// 404处理
app.use('*', (_req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// 错误处理中间件
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

export default app; 