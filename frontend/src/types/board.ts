import { PinConfig } from './pin';
import { ModuleConfig } from './module';
import { BOARD_VERSIONS, type BoardVersion } from '../services/config';

// 系统约束接口
export interface SystemConstraints {
  powerBudget: {
    total: number; // mW
    available: number; // mW
    used: number; // mW
  };
  timingConstraints: TimingConstraint[];
  emiConsiderations: EMIConfig[];
}

// 时序约束
export interface TimingConstraint {
  id: string;
  type: 'frequency' | 'setup' | 'hold';
  value: number;
  unit: string;
  description: string;
}

// EMI配置
export interface EMIConfig {
  id: string;
  type: 'shielding' | 'filtering' | 'grounding';
  description: string;
  pins: string[];
}

// 冲突信息
export interface Conflict {
  id: string;
  type: 'PIN_CONFLICT' | 'TIMING_CONFLICT' | 'POWER_CONFLICT';
  severity: 'error' | 'warning' | 'info';
  message: string;
  pins?: string[];
  modules?: string[];
  details?: Record<string, any>;
}

// 主板配置接口
export interface BoardConfig {
  version: BoardVersion;
  revision: string;
  manufacturer: string;
  description: string;
  pins: Map<string, PinConfig>;
  modules: Map<string, ModuleConfig>;
  constraints: SystemConstraints;
  metadata: {
    createdAt: string;
    updatedAt: string;
    author: string;
  };
}

// 配置验证结果
export interface ValidationResult {
  isValid: boolean;
  errors: Conflict[];
  warnings: Conflict[];
  info: Conflict[];
}

// 导出主板版本常量
export { BOARD_VERSIONS }; 