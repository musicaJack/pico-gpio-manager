export declare const SERVER_CONFIG: {
    readonly port: 5000;
    readonly host: "localhost";
    readonly cors: {
        readonly origin: readonly ["http://localhost:3000", "http://127.0.0.1:3000"];
        readonly credentials: true;
    };
};
export declare const API_ROUTES: {
    readonly boards: "/api/boards";
    readonly pins: "/api/pins";
    readonly modules: "/api/modules";
    readonly validation: "/api/validation";
    readonly codeGeneration: "/api/code-generation";
};
export declare const FILE_PATHS: {
    readonly dataDir: "./data";
    readonly configsDir: "./data/configs";
    readonly boardsDir: "./data/boards";
    readonly templatesDir: "./data/templates";
    readonly systemConfig: "./data/configs/system.json";
    readonly pinsConfig: "./data/configs/pins.json";
    readonly boardTemplate: "./data/templates/board-template.json";
};
export declare const ERROR_MESSAGES: {
    readonly FILE_NOT_FOUND: "配置文件未找到";
    readonly INVALID_CONFIG: "配置数据无效";
    readonly PIN_CONFLICT: "引脚冲突";
    readonly MODULE_NOT_FOUND: "模块未找到";
    readonly BOARD_NOT_FOUND: "主板配置未找到";
    readonly VALIDATION_FAILED: "配置验证失败";
};
export declare const SUCCESS_MESSAGES: {
    readonly CONFIG_LOADED: "配置加载成功";
    readonly CONFIG_SAVED: "配置保存成功";
    readonly PIN_ASSIGNED: "引脚分配成功";
    readonly MODULE_CREATED: "模块创建成功";
    readonly VALIDATION_PASSED: "配置验证通过";
};
export declare const SYSTEM_CONSTRAINTS: {
    readonly powerBudget: {
        readonly total: 3960;
        readonly reserved: 500;
        readonly available: 3460;
    };
    readonly timing: {
        readonly spiMaxFrequency: 125000000;
        readonly i2cMaxFrequency: 1000000;
        readonly uartMaxBaudRate: 921600;
        readonly i2sMaxFrequency: 48000000;
    };
    readonly maxPins: 40;
    readonly maxModules: 20;
};
export declare const SUPPORTED_LANGUAGES: {
    readonly C: "c";
    readonly PYTHON: "python";
    readonly JAVASCRIPT: "javascript";
};
export declare const FILE_EXTENSIONS: {
    readonly JSON: ".json";
    readonly C: ".c";
    readonly PYTHON: ".py";
    readonly JAVASCRIPT: ".js";
};
export declare const CACHE_CONFIG: {
    readonly ttl: 300000;
    readonly maxSize: 100;
};
export declare const LOG_CONFIG: {
    readonly level: "info";
    readonly format: "combined";
    readonly maxSize: "10m";
    readonly maxFiles: 5;
};
//# sourceMappingURL=constants.d.ts.map