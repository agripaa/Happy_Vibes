const express = require('express');
const router = express.Router();

const { getAll } = require('../Controller/bookmarkPosting.controller');
const { sessionUser } = require('../middleware/session.js');
const { getBookmarkCollectionById, createBookmarkCollection, updateBookmarkCollection } = require('../Controller/bookmarkCollection.controller');

router.get('/', sessionUser, getAll);
router.get('/:id/bookmark-collection', sessionUser,  getBookmarkCollectionById);
router.post('/create/bookmark-collection', sessionUser, createBookmarkCollection);
router.patch('/:id/update/bookmark-collection', sessionUser, updateBookmarkCollection);
router.delete('/delete/:id/bookmark-collection', sessionUser,);

module.exports = router;