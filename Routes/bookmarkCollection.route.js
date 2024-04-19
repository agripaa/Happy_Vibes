const express = require('express');
const router = express.Router();

const { sessionUser } = require('../middleware/session.js');
const {getAll, getBookmarkCollectionById, createBookmarkCollection, updateBookmarkCollection, deleteBookmarkCollection } = require('../Controller/bookmarkCollection.controller');

router.get('/', sessionUser, getAll);
router.get('/:id/bookmark-collection', sessionUser,  getBookmarkCollectionById);
router.post('/create/bookmark-collection', sessionUser, createBookmarkCollection);
router.patch('/:id/update/bookmark-collection', sessionUser, updateBookmarkCollection);
router.delete('/delete/bookmark-collection', sessionUser, deleteBookmarkCollection);

module.exports = router;