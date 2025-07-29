"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const boardRoutes_1 = __importDefault(require("./routes/boardRoutes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api/boards', boardRoutes_1.default);
app.get('/health', (_req, res) => {
    res.json({ status: 'OK', message: 'Server is running' });
});
app.use('*', (_req, res) => {
    res.status(404).json({ error: 'Route not found' });
});
app.use((err, _req, res, _next) => {
    console.error('Error:', err);
    res.status(500).json({ error: 'Internal server error' });
});
exports.default = app;
//# sourceMappingURL=app.js.map