"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoardController = void 0;
const configLoader_1 = require("../services/configLoader");
const constants_1 = require("../config/constants");
const BOARD_VERSIONS = {
    BOARD_1: 'board-1',
    BOARD_2: 'board-2',
    BOARD_3: 'board-3'
};
class BoardController {
    static async getBoardVersions(_req, res) {
        try {
            const versions = Object.values(BOARD_VERSIONS);
            res.json({
                success: true,
                data: versions,
                message: constants_1.SUCCESS_MESSAGES.CONFIG_LOADED
            });
        }
        catch (error) {
            console.error('Error getting board versions:', error);
            res.status(500).json({
                success: false,
                error: constants_1.ERROR_MESSAGES.FILE_NOT_FOUND
            });
        }
    }
    static async getBoardConfig(req, res) {
        try {
            const { boardId } = req.params;
            if (!boardId) {
                res.status(400).json({
                    success: false,
                    error: constants_1.ERROR_MESSAGES.INVALID_CONFIG
                });
                return;
            }
            const configLoader = configLoader_1.ConfigLoader.getInstance();
            const boardConfig = await configLoader.loadBoardConfig(boardId);
            if (!boardConfig) {
                res.status(404).json({
                    success: false,
                    error: constants_1.ERROR_MESSAGES.BOARD_NOT_FOUND
                });
                return;
            }
            res.json({
                success: true,
                data: boardConfig,
                message: constants_1.SUCCESS_MESSAGES.CONFIG_LOADED
            });
        }
        catch (error) {
            console.error('Error getting board config:', error);
            res.status(500).json({
                success: false,
                error: constants_1.ERROR_MESSAGES.FILE_NOT_FOUND
            });
        }
    }
    static async getPins(_req, res) {
        try {
            const configLoader = configLoader_1.ConfigLoader.getInstance();
            const pins = await configLoader.loadPinDefinitions();
            res.json({
                success: true,
                data: pins,
                message: constants_1.SUCCESS_MESSAGES.CONFIG_LOADED
            });
        }
        catch (error) {
            console.error('Error getting pins:', error);
            res.status(500).json({
                success: false,
                error: constants_1.ERROR_MESSAGES.FILE_NOT_FOUND
            });
        }
    }
    static async getModules(_req, res) {
        try {
            const configLoader = configLoader_1.ConfigLoader.getInstance();
            const modules = await configLoader.loadSystemConfig();
            res.json({
                success: true,
                data: modules,
                message: constants_1.SUCCESS_MESSAGES.CONFIG_LOADED
            });
        }
        catch (error) {
            console.error('Error getting modules:', error);
            res.status(500).json({
                success: false,
                error: constants_1.ERROR_MESSAGES.FILE_NOT_FOUND
            });
        }
    }
}
exports.BoardController = BoardController;
//# sourceMappingURL=boardController.js.map