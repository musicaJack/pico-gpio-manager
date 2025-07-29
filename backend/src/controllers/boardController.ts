import { Request, Response } from 'express';
import { ConfigLoader } from '../services/configLoader';

// 主板版本常量
const BOARD_VERSIONS = {
  BOARD_1: 'board-1',
  BOARD_2: 'board-2',
  BOARD_3: 'board-3'
} as const;

export class BoardController {
  // 获取所有主板版本
  static async getBoardVersions(req: Request, res: Response) {
    try {
      const versions = Object.values(BOARD_VERSIONS);
      res.json({
        success: true,
        data: versions
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: '获取主板版本失败',
        error: error instanceof Error ? error.message : '未知错误'
      });
    }
  }

  // 获取指定主板的配置
  static async getBoardConfig(req: Request, res: Response) {
    try {
      const { boardId } = req.params;
      
      if (!boardId) {
        return res.status(400).json({
          success: false,
          message: '主板ID不能为空'
        });
      }
      
      // 验证主板ID
      if (!Object.values(BOARD_VERSIONS).includes(boardId as any)) {
        return res.status(400).json({
          success: false,
          message: '无效的主板版本'
        });
      }

      // 加载主板配置
      const configLoader = ConfigLoader.getInstance();
      
      // 清除缓存以确保获取最新数据
      configLoader.clearCacheItem(`board-${boardId}`);
      
      const boardConfig = await configLoader.loadBoardConfig(boardId);
      
      if (!boardConfig) {
        return res.status(404).json({
          success: false,
          message: '主板配置不存在'
        });
      }

      res.json({
        success: true,
        data: boardConfig
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: '获取主板配置失败',
        error: error instanceof Error ? error.message : '未知错误'
      });
    }
  }

  // 获取所有引脚定义
  static async getPins(req: Request, res: Response) {
    try {
      const configLoader = ConfigLoader.getInstance();
      const pins = await configLoader.loadPinDefinitions();
      
      res.json({
        success: true,
        data: pins
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: '获取引脚定义失败',
        error: error instanceof Error ? error.message : '未知错误'
      });
    }
  }

  // 获取所有模块定义
  static async getModules(req: Request, res: Response) {
    try {
      const configLoader = ConfigLoader.getInstance();
      const modules = await configLoader.loadSystemConfig();
      
      res.json({
        success: true,
        data: modules
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: '获取模块定义失败',
        error: error instanceof Error ? error.message : '未知错误'
      });
    }
  }
} 