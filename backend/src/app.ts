import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import boardRoutes from './routes/boardRoutes';
import { SERVER_CONFIG } from './config/constants';

const app = express();

// 中间件
app.use(helmet());
app.use(cors());
app.use(compression());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 路由
app.use('/api/boards', boardRoutes);

// 健康检查
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// 404 处理
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'API endpoint not found'
  });
});

// 错误处理中间件
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error'
  });
});

export default app; 