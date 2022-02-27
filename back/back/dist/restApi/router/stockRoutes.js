"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const multiStock_1 = require("../controller/multiStock");
const { Router } = require('express');
const router = Router();
router.post('/sync', multiStock_1.MultiStockController);
exports.default = router;
