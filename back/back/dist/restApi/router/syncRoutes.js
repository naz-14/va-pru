"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sync_1 = require("../controller/sync");
const { Router } = require('express');
const router = Router();
router.post('/', sync_1.syncController);
router.get('/', sync_1.syncBatchController);
exports.default = router;
