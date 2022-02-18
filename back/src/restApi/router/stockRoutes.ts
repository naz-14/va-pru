import { MultiStockController } from "../controller/multiStock"
const { Router } = require('express')
const router = Router()

router.post('/sync', MultiStockController)

export default router
