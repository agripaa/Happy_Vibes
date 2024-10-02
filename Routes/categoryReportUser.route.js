const express = require('express');
const router = express.Router();

const { getAll, createCategoryAccount, updateCategoryAccount, deleteCategoryAccount } = require('../Controller/categoryAccountReport.controller.js');

router.get('/', getAll);
router.post('/', createCategoryAccount);
router.patch('/:id', updateCategoryAccount);
router.delete('/:id', deleteCategoryAccount);

module.exports = router;