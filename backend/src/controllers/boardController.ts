import { Request, Response } from 'express';
import { ConfigLoader } from '../services/configLoader';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '../config/constants';

// 主板版本常量
const BOARD_VERSIONS = {
  BOARD_1: 'board-1',
  BOARD_2: 'board-2',
  BOARD_3: 'board-3'
} as const;

export class BoardController {
  /**
   * 获取所有可用的板版本
   */
  static async getBoardVersions(_req: Request, res: Response) {
    try {
      const versions = Object.values(BOARD_VERSIONS);
      res.json({
        success: true,
        data: versions,
        message: SUCCESS_MESSAGES.CONFIG_LOADED
      });
    } catch (error) {
      console.error('Error getting board versions:', error);
      res.status(500).json({
        success: false,
        error: ERROR_MESSAGES.FILE_NOT_FOUND
      });
    }
  }

  /**
   * 获取指定板的配置信息
   */
  static async getBoardConfig(req: Request, res: Response) {
    try {
      const { boardId } = req.params;
      
      if (!boardId) {
        res.status(400).json({
          success: false,
          error: ERROR_MESSAGES.INVALID_CONFIG
        });
        return;
      }

      const configLoader = ConfigLoader.getInstance();
      const boardConfig = await configLoader.loadBoardConfig(boardId);
      
      if (!boardConfig) {
        res.status(404).json({
          success: false,
          error: ERROR_MESSAGES.BOARD_NOT_FOUND
        });
        return;
      }

      res.json({
        success: true,
        data: boardConfig,
        message: SUCCESS_MESSAGES.CONFIG_LOADED
      });
    } catch (error) {
      console.error('Error getting board config:', error);
      res.status(500).json({
        success: false,
        error: ERROR_MESSAGES.FILE_NOT_FOUND
      });
    }
  }

  /**
   * 获取指定板的所有引脚信息
   */
  static async getPins(_req: Request, res: Response) {
    try {
      const configLoader = ConfigLoader.getInstance();
      const pins = await configLoader.loadPinDefinitions();
      res.json({
        success: true,
        data: pins,
        message: SUCCESS_MESSAGES.CONFIG_LOADED
      });
    } catch (error) {
      console.error('Error getting pins:', error);
      res.status(500).json({
        success: false,
        error: ERROR_MESSAGES.FILE_NOT_FOUND
      });
    }
  }

  /**
   * 获取指定板的模块信息
   */
  static async getModules(_req: Request, res: Response) {
    try {
      const configLoader = ConfigLoader.getInstance();
      const modules = await configLoader.loadSystemConfig();
      res.json({
        success: true,
        data: modules,
        message: SUCCESS_MESSAGES.CONFIG_LOADED
      });
    } catch (error) {
      console.error('Error getting modules:', error);
      res.status(500).json({
        success: false,
        error: ERROR_MESSAGES.FILE_NOT_FOUND
      });
    }
  }
} 