import { syncBatchController, syncController, syncGet } from '../controller/sync'

const { Router } = require('express')
const router = Router()

router.post('/', syncController)
router.get('/', syncBatchController)

export default router
