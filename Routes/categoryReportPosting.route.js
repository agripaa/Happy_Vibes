const express = require('express');
const router = express.Router();

const { getCategoryPostingData, getOneCategoryPostingData, createCategoryPostingData, updateCategoryPostingData, deleteCategoryPostingData } = require('../Controller/categoryPostingReport.controller');

router.get('/', getCategoryPostingData);
router.get('/:id', getOneCategoryPostingData);
router.post('/', createCategoryPostingData);
router.patch('/:id', updateCategoryPostingData);
router.delete('/:id', deleteCategoryPostingData);

module.exports = router;