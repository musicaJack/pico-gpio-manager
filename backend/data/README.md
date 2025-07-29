# 静态配置数据说明

本目录包含RP2040 GPIO管理系统的所有静态配置数据，程序启动时自动加载。

## 目录结构

```
data/
├── boards/           # 主板配置文件
│   ├── 1号板.json
│   ├── 2号板.json
│   └── 3号板.json
├── configs/          # 系统配置数据
│   ├── system.json   # 系统级配置（主板版本、接口类型、模块类型等）
│   └── pins.json     # RP2040引脚定义
└── templates/        # 配置模板
    └── board-template.json  # 主板配置模板
```

## 配置文件说明

### 1. system.json - 系统配置
包含以下静态数据：
- **boardVersions**: 主板版本信息
- **interfaceTypes**: 接口类型定义（SPI、I2C、UART、I2S等）
- **moduleTypes**: 模块类型定义（TFT_LCD、MICROSD、JOYSTICK等）
- **pinStatusColors**: 引脚状态颜色配置
- **systemConstraints**: 系统约束（电源预算、时序约束、EMI考虑）

### 2. pins.json - 引脚定义
基于[Pico官方引脚信息](https://pico.nxez.com/pinout/pico/)创建的完整引脚定义：
- 40个引脚的完整信息
- 每个引脚的功能映射（SPI、I2C、UART、PWM、ADC等）
- 引脚位置信息（用于可视化）
- 电压和功能描述

### 3. board-template.json - 主板模板
主板配置的基础模板，包含：
- 基础配置结构
- 系统约束定义
- 元数据字段

## 数据特点

1. **静态性**: 这些数据在程序运行期间不会改变
2. **完整性**: 包含所有必要的业务数据
3. **可扩展性**: 易于添加新的主板版本、模块类型等
4. **标准化**: 统一的数据格式和命名规范

## 使用方式

程序启动时通过 `ConfigLoader` 服务自动加载这些配置：

```typescript
import { configLoader } from '../services/configLoader';

// 加载系统配置
const systemConfig = configLoader.loadSystemConfig();

// 加载引脚定义
const pinDefinitions = configLoader.loadPinDefinitions();

// 获取主板版本
const boardVersions = configLoader.getBoardVersions();

// 获取模块类型
const moduleTypes = configLoader.getModuleTypes();
```

## 维护说明

- 添加新的主板版本：在 `system.json` 的 `boardVersions` 数组中添加
- 添加新的模块类型：在 `system.json` 的 `moduleTypes` 数组中添加
- 修改引脚定义：编辑 `pins.json` 文件
- 更新系统约束：修改 `system.json` 的 `systemConstraints` 部分

## 数据来源

- 引脚定义：基于 [Pico官方引脚信息](https://pico.nxez.com/pinout/pico/)
- 接口规范：基于RP2040数据手册
- 模块定义：基于项目需求文档 