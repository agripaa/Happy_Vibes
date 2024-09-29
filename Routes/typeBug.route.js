const express = require('express');
const router = express.Router();

const { getTypeBugReport, createTypeBugReport, updateTypeBugReport, deleteTypeBugReport } = require('../Controller/typeBugReport.controller');

router.get('/', getTypeBugReport);
router.post('/', createTypeBugReport);
router.patch('/:id', updateTypeBugReport);
router.delete('/:id', deleteTypeBugReport);

module.exports = router;