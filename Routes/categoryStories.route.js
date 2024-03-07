const express = require('express');
const router = express.Router();

const { getAll, createCategoryStory, deleteCategoryStory } = require('../Controller/categoryStory.controller.js');

router.get('/', getAll);
router.post('/create', createCategoryStory);
router.delete('/delete/:id/category', deleteCategoryStory)

module.exports = router;