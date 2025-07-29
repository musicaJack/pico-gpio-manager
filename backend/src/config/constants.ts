// 后端配置常量

// 服务器配置
export const SERVER_CONFIG = {
  port: 5000,
  host: 'localhost',
  cors: {
    origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
    credentials: true
  }
} as const;

// API路由配置
export const API_ROUTES = {
  boards: '/api/boards',
  pins: '/api/pins',
  modules: '/api/modules',
  validation: '/api/validation',
  codeGeneration: '/api/code-generation'
} as const;

// 文件路径配置
export const FILE_PATHS = {
  dataDir: './data',
  configsDir: './data/configs',
  boardsDir: './data/boards',
  templatesDir: './data/templates',
  systemConfig: './data/configs/system.json',
  pinsConfig: './data/configs/pins.json',
  boardTemplate: './data/templates/board-template.json'
} as const;

// 错误消息配置
export const ERROR_MESSAGES = {
  FILE_NOT_FOUND: '配置文件未找到',
  INVALID_CONFIG: '配置数据无效',
  PIN_CONFLICT: '引脚冲突',
  MODULE_NOT_FOUND: '模块未找到',
  BOARD_NOT_FOUND: '主板配置未找到',
  VALIDATION_FAILED: '配置验证失败'
} as const;

// 成功消息配置
export const SUCCESS_MESSAGES = {
  CONFIG_LOADED: '配置加载成功',
  CONFIG_SAVED: '配置保存成功',
  PIN_ASSIGNED: '引脚分配成功',
  MODULE_CREATED: '模块创建成功',
  VALIDATION_PASSED: '配置验证通过'
} as const;

// 系统约束配置
export const SYSTEM_CONSTRAINTS = {
  powerBudget: {
    total: 3960, // mW
    reserved: 500, // mW
    available: 3460 // mW
  },
  timing: {
    spiMaxFrequency: 125000000, // Hz
    i2cMaxFrequency: 1000000, // Hz
    uartMaxBaudRate: 921600, // bps
    i2sMaxFrequency: 48000000 // Hz
  },
  maxPins: 40,
  maxModules: 20
} as const;

// 支持的代码生成语言
export const SUPPORTED_LANGUAGES = {
  C: 'c',
  PYTHON: 'python',
  JAVASCRIPT: 'javascript'
} as const;

// 文件扩展名配置
export const FILE_EXTENSIONS = {
  JSON: '.json',
  C: '.c',
  PYTHON: '.py',
  JAVASCRIPT: '.js'
} as const;

// 缓存配置
export const CACHE_CONFIG = {
  ttl: 300000, // 5分钟
  maxSize: 100
} as const;

// 日志配置
export const LOG_CONFIG = {
  level: 'info',
  format: 'combined',
  maxSize: '10m',
  maxFiles: 5
} as const; 