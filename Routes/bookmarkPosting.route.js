const express = require('express');
const router = express.Router();

const { getAll,  handleBookmarkPosting} = require('../Controller/bookmarkPosting.controller');
const { sessionUser } = require('../middleware/session');

router.get('/:bookmark_coll_id', sessionUser, getAll);
router.post('/handle_bookmark_posting', sessionUser, handleBookmarkPosting);

module.exports = router;