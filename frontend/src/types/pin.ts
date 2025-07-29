import { PIN_FUNCTIONS, PIN_STATUS, INTERFACE_TYPES, type PinFunction, type PinStatus, type InterfaceType } from '../services/config';

// 引脚配置接口
export interface PinConfig {
  id: string;
  number: number;
  name: string;
  function: PinFunction;
  module?: string;
  status: PinStatus;
  voltage: '3.3V' | '5V' | 'GND';
  current?: number;
  description: string;
  spi?: {
    interface: 'SPI0' | 'SPI1';
    role: 'SCK' | 'MOSI' | 'MISO' | 'CS';
  };
  i2c?: {
    interface: 'I2C0' | 'I2C1';
    role: 'SDA' | 'SCL';
  };
  uart?: {
    interface: 'UART0' | 'UART1';
    role: 'TX' | 'RX' | 'CTS' | 'RTS';
  };
  pwm?: {
    channel: string;
    slice: number;
  };
  adc?: {
    channel: number;
  };
}

// 引脚位置信息
export interface PinPosition {
  x: number;
  y: number;
  side: 'left' | 'right';
  row: number;
}

// 导出常量和类型
export { PIN_FUNCTIONS, PIN_STATUS, INTERFACE_TYPES, type PinStatus, type PinFunction, type InterfaceType }; 