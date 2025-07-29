import * as fs from 'fs/promises';
import * as path from 'path';
import { FILE_PATHS, ERROR_MESSAGES, SUCCESS_MESSAGES } from '../config/constants';

// 配置数据类型
export interface SystemConfig {
  boardVersions: BoardVersion[];
  interfaceTypes: InterfaceType[];
  moduleTypes: ModuleType[];
  pinStatusColors: Record<string, string>;
  systemConstraints: SystemConstraints;
}

export interface BoardVersion {
  id: string;
  name: string;
  description: string;
  manufacturer: string;
  revision: string;
  powerSupply: string;
  maxCurrent: number;
}

export interface InterfaceType {
  id: string;
  name: string;
  description: string;
  maxFrequency?: number;
  maxBaudRate?: number;
  maxSampleRate?: number;
  pins: string[];
  color: string;
}

export interface ModuleType {
  id: string;
  name: string;
  description: string;
  interface: string;
  icon: string;
  color: string;
  defaultPins: string[];
  power: {
    voltage: string;
    current: number;
    power: number;
  };
}

export interface SystemConstraints {
  powerBudget: {
    total: number;
    reserved: number;
    available: number;
  };
  timingConstraints: TimingConstraint[];
  emiConsiderations: EMIConfig[];
}

export interface TimingConstraint {
  id: string;
  type: string;
  value: number;
  unit: string;
  description: string;
}

export interface EMIConfig {
  id: string;
  type: string;
  description: string;
  pins: string[];
}

export interface PinDefinition {
  id: string;
  number: number;
  name: string;
  function: string;
  voltage: string;
  description: string;
  spi?: {
    interface: string;
    role: string;
  };
  i2c?: {
    interface: string;
    role: string;
  };
  uart?: {
    interface: string;
    role: string;
  };
  pwm?: {
    channel: string;
    slice: number;
  };
  adc?: {
    channel: number;
  };
  position: {
    x: number;
    y: number;
    side: string;
    row: number;
  };
}

// 配置加载器类
export class ConfigLoader {
  private static instance: ConfigLoader;
  private cache: Map<string, any> = new Map();

  private constructor() {}

  public static getInstance(): ConfigLoader {
    if (!ConfigLoader.instance) {
      ConfigLoader.instance = new ConfigLoader();
    }
    return ConfigLoader.instance;
  }

  // 加载系统配置
  public async loadSystemConfig(): Promise<any> {
    const cacheKey = 'system';
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    try {
      const configPath = path.join(__dirname, '../../data/configs/system.json');
      const data = await fs.readFile(configPath, 'utf-8');
      const config = JSON.parse(data);
      this.cache.set(cacheKey, config);
      return config;
    } catch (error) {
      console.error('Error loading system config:', error);
      throw error;
    }
  }

  // 加载引脚定义
  public async loadPinDefinitions(): Promise<any> {
    const cacheKey = 'pins';
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    try {
      const configPath = path.join(__dirname, '../../data/configs/pins.json');
      const data = await fs.readFile(configPath, 'utf-8');
      const config = JSON.parse(data);
      this.cache.set(cacheKey, config);
      return config;
    } catch (error) {
      console.error('Error loading pin definitions:', error);
      throw error;
    }
  }

  // 加载主板配置
  public async loadBoardConfig(boardId: string): Promise<any> {
    const cacheKey = `board-${boardId}`;
    if (this.cache.has(cacheKey)) {
      console.log(`从缓存加载主板配置: ${boardId}`);
      return this.cache.get(cacheKey);
    }
    try {
      const configPath = path.join(__dirname, `../../data/boards/${boardId}.json`);
      console.log(`从文件加载主板配置: ${configPath}`);
      const data = await fs.readFile(configPath, 'utf-8');
      const config = JSON.parse(data);
      this.cache.set(cacheKey, config);
      console.log(`主板配置加载成功: ${boardId}, 引脚数: ${config.pins.length}, 模块数: ${config.modules.length}`);
      return config;
    } catch (error) {
      console.error(`Error loading board config for ${boardId}:`, error);
      throw error;
    }
  }

  // 清除缓存
  public clearCache(): void {
    this.cache.clear();
  }

  // 清除特定缓存
  public clearCacheItem(key: string): void {
    this.cache.delete(key);
  }
}

// 导出单例实例
export const configLoader = ConfigLoader.getInstance(); 