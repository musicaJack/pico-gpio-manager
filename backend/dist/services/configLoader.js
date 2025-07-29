"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.configLoader = exports.ConfigLoader = void 0;
const fs = __importStar(require("fs/promises"));
const path = __importStar(require("path"));
class ConfigLoader {
    constructor() {
        this.cache = new Map();
    }
    static getInstance() {
        if (!ConfigLoader.instance) {
            ConfigLoader.instance = new ConfigLoader();
        }
        return ConfigLoader.instance;
    }
    async loadSystemConfig() {
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
        }
        catch (error) {
            console.error('Error loading system config:', error);
            throw error;
        }
    }
    async loadPinDefinitions() {
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
        }
        catch (error) {
            console.error('Error loading pin definitions:', error);
            throw error;
        }
    }
    async loadBoardConfig(boardId) {
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
        }
        catch (error) {
            console.error(`Error loading board config for ${boardId}:`, error);
            throw error;
        }
    }
    clearCache() {
        this.cache.clear();
    }
    clearCacheItem(key) {
        this.cache.delete(key);
    }
}
exports.ConfigLoader = ConfigLoader;
exports.configLoader = ConfigLoader.getInstance();
//# sourceMappingURL=configLoader.js.map