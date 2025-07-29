import { Router } from 'express';
import { BoardController } from '../controllers/boardController';

const router = Router();

// 获取所有主板版本
router.get('/versions', BoardController.getBoardVersions);

// 获取指定主板的配置
router.get('/config/:boardId', BoardController.getBoardConfig);

// 获取所有引脚定义
router.get('/pins', BoardController.getPins);

// 获取所有模块定义
router.get('/modules', BoardController.getModules);

export default router; 