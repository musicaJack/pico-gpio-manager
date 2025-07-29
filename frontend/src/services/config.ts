// 前端配置服务 - 统一管理所有静态配置数据

// 应用配置
export const APP_CONFIG = {
  name: 'RP2040 GPIO Manager',
  version: '1.0.0',
  description: 'RP2040引脚管理系统',
  githubUrl: 'https://github.com/your-repo/pico-gpio-manager',
  theme: {
    primaryColor: '#1890ff',
    borderRadius: 6,
  }
} as const;

// 主板版本
export const BOARD_VERSIONS = {
  BOARD_1: 'board-1',
  BOARD_2: 'board-2', 
  BOARD_3: 'board-3'
} as const;

// 引脚功能类型配置
export const PIN_FUNCTIONS = {
  GPIO: 'GPIO',
  SPI: 'SPI',
  I2C: 'I2C',
  UART: 'UART',
  I2S: 'I2S',
  PWM: 'PWM',
  ADC: 'ADC',
  POWER: 'POWER',
  GROUND: 'GROUND'
} as const;

// 接口类型配置
export const INTERFACE_TYPES = {
  SPI0: 'SPI0',
  SPI1: 'SPI1',
  I2C0: 'I2C0',
  I2C1: 'I2C1',
  UART0: 'UART0',
  UART1: 'UART1',
  I2S0: 'I2S0',
  I2S1: 'I2S1',
  GPIO: 'GPIO'
} as const;

// 模块类型配置
export const MODULE_TYPES = {
  TFT_LCD: 'TFT_LCD',
  MICROSD: 'MICROSD',
  JOYSTICK: 'JOYSTICK',
  AMPLIFIER: 'AMPLIFIER',
  MICROPHONE: 'MICROPHONE',
  UART: 'UART',
  BUTTONS: 'BUTTONS',
  IO_EXPANSION: 'IO_EXPANSION'
} as const;

// 引脚状态配置
export const PIN_STATUS = {
  AVAILABLE: 'available',
  USED: 'used',
  CONFLICT: 'conflict',
  CRITICAL: 'critical'
} as const;

// 颜色配置
export const COLORS = {
  // 主题颜色
  primary: '#1890ff',
  success: '#52c41a',
  warning: '#faad14',
  error: '#f5222d',
  info: '#1890ff',
  
  // 接口类型颜色
  spi: '#722ed1',
  i2c: '#13c2c2',
  uart: '#fa8c16',
  i2s: '#eb2f96',
  gpio: '#52c41a',
  pwm: '#fa541c',
  adc: '#a0d911',
  
  // 引脚状态颜色
  pinAvailable: '#52c41a',
  pinUsed: '#1890ff',
  pinConflict: '#faad14',
  pinCritical: '#f5222d'
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
  }
} as const;

// 默认配置
export const DEFAULT_CONFIG = {
  boardVersion: BOARD_VERSIONS.BOARD_3,
  theme: 'light',
  sidebarCollapsed: false
} as const;

// 配置类型定义
export type BoardVersion = typeof BOARD_VERSIONS[keyof typeof BOARD_VERSIONS];
export type PinFunction = typeof PIN_FUNCTIONS[keyof typeof PIN_FUNCTIONS];
export type InterfaceType = typeof INTERFACE_TYPES[keyof typeof INTERFACE_TYPES];
export type ModuleType = typeof MODULE_TYPES[keyof typeof MODULE_TYPES];
export type PinStatus = typeof PIN_STATUS[keyof typeof PIN_STATUS];

// 配置验证函数
export const validateBoardVersion = (version: string): version is BoardVersion => {
  return Object.values(BOARD_VERSIONS).includes(version as BoardVersion);
};

export const validatePinFunction = (func: string): func is PinFunction => {
  return Object.values(PIN_FUNCTIONS).includes(func as PinFunction);
};

export const validateInterfaceType = (type: string): type is InterfaceType => {
  return Object.values(INTERFACE_TYPES).includes(type as InterfaceType);
};

export const validateModuleType = (type: string): type is ModuleType => {
  return Object.values(MODULE_TYPES).includes(type as ModuleType);
};

export const validatePinStatus = (status: string): status is PinStatus => {
  return Object.values(PIN_STATUS).includes(status as PinStatus);
}; 