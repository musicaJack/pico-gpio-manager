import { MODULE_TYPES, INTERFACE_TYPES, type ModuleType, type InterfaceType } from '../services/config';

// 电源配置
export interface PowerConfig {
  voltage: '3.3V' | '5V';
  current: number; // mA
  power: number; // mW
}

// 时序配置
export interface TimingConfig {
  frequency?: number; // Hz
  setupTime?: number; // ns
  holdTime?: number; // ns
}

// 模块配置接口
export interface ModuleConfig {
  id: string;
  name: string;
  type: ModuleType;
  interface: InterfaceType;
  pins: string[]; // 引脚ID数组
  power: PowerConfig;
  timing?: TimingConfig;
  description: string;
  icon?: string;
  color?: string;
  configurable: boolean;
  defaultConfig?: Record<string, any>;
}

// 导出常量
export { MODULE_TYPES, INTERFACE_TYPES }; 