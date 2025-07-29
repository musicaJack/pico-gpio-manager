"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const constants_1 = require("./config/constants");
const server = app_1.default.listen(constants_1.SERVER_CONFIG.port, () => {
    console.log(`🚀 Server running on port ${constants_1.SERVER_CONFIG.port}`);
    console.log(`📊 Health check: http://localhost:${constants_1.SERVER_CONFIG.port}/health`);
    console.log(`🔧 API docs: http://localhost:${constants_1.SERVER_CONFIG.port}/api`);
});
process.on('SIGTERM', () => {
    console.log('SIGTERM received, shutting down gracefully');
    server.close(() => {
        console.log('Process terminated');
    });
});
process.on('SIGINT', () => {
    console.log('SIGINT received, shutting down gracefully');
    server.close(() => {
        console.log('Process terminated');
    });
});
exports.default = server;
//# sourceMappingURL=server.js.map