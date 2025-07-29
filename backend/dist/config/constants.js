"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LOG_CONFIG = exports.CACHE_CONFIG = exports.FILE_EXTENSIONS = exports.SUPPORTED_LANGUAGES = exports.SYSTEM_CONSTRAINTS = exports.SUCCESS_MESSAGES = exports.ERROR_MESSAGES = exports.FILE_PATHS = exports.API_ROUTES = exports.SERVER_CONFIG = void 0;
exports.SERVER_CONFIG = {
    port: 5000,
    host: 'localhost',
    cors: {
        origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
        credentials: true
    }
};
exports.API_ROUTES = {
    boards: '/api/boards',
    pins: '/api/pins',
    modules: '/api/modules',
    validation: '/api/validation',
    codeGeneration: '/api/code-generation'
};
exports.FILE_PATHS = {
    dataDir: './data',
    configsDir: './data/configs',
    boardsDir: './data/boards',
    templatesDir: './data/templates',
    systemConfig: './data/configs/system.json',
    pinsConfig: './data/configs/pins.json',
    boardTemplate: './data/templates/board-template.json'
};
exports.ERROR_MESSAGES = {
    FILE_NOT_FOUND: '配置文件未找到',
    INVALID_CONFIG: '配置数据无效',
    PIN_CONFLICT: '引脚冲突',
    MODULE_NOT_FOUND: '模块未找到',
    BOARD_NOT_FOUND: '主板配置未找到',
    VALIDATION_FAILED: '配置验证失败'
};
exports.SUCCESS_MESSAGES = {
    CONFIG_LOADED: '配置加载成功',
    CONFIG_SAVED: '配置保存成功',
    PIN_ASSIGNED: '引脚分配成功',
    MODULE_CREATED: '模块创建成功',
    VALIDATION_PASSED: '配置验证通过'
};
exports.SYSTEM_CONSTRAINTS = {
    powerBudget: {
        total: 3960,
        reserved: 500,
        available: 3460
    },
    timing: {
        spiMaxFrequency: 125000000,
        i2cMaxFrequency: 1000000,
        uartMaxBaudRate: 921600,
        i2sMaxFrequency: 48000000
    },
    maxPins: 40,
    maxModules: 20
};
exports.SUPPORTED_LANGUAGES = {
    C: 'c',
    PYTHON: 'python',
    JAVASCRIPT: 'javascript'
};
exports.FILE_EXTENSIONS = {
    JSON: '.json',
    C: '.c',
    PYTHON: '.py',
    JAVASCRIPT: '.js'
};
exports.CACHE_CONFIG = {
    ttl: 300000,
    maxSize: 100
};
exports.LOG_CONFIG = {
    level: 'info',
    format: 'combined',
    maxSize: '10m',
    maxFiles: 5
};
//# sourceMappingURL=constants.js.map