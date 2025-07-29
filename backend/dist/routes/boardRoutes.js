"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const boardController_1 = require("../controllers/boardController");
const router = (0, express_1.Router)();
router.get('/versions', boardController_1.BoardController.getBoardVersions);
router.get('/config/:boardId', boardController_1.BoardController.getBoardConfig);
router.get('/pins', boardController_1.BoardController.getPins);
router.get('/modules', boardController_1.BoardController.getModules);
exports.default = router;
//# sourceMappingURL=boardRoutes.js.map