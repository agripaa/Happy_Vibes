const express = require('express');
const routeAuth = require('./auth.route');
const routeBackground = require('./background.route');
const routeBugreport = require('./bugreport.route');
const routeComment = require('./comment.route');
const routeFollows = require('./follows.route');
const routeLike = require('./like.route');
const routeNotif = require('./notif.route');
const routePosting = require('./posting.route');
const routeRandomPhoto = require('./randomPhoto.route');
const routeReportPosting = require('./reportposting.route');
const routeSearch = require('./search.route');
const routeUsers = require('./users.route');
const routeOtp = require('./otp.route');
const routeForgotPass = require('./forgotPassword.route');

const router = express.Router();

router.use((req, res, next) => {
    res.header(
        'Access-Control-Allow-Headers',
        'x-access-token, Origin, Content-Type, Accept',
    );
    next();
});

router.use('/auth', routeAuth);
router.use('/background', routeBackground);
router.use('/bug-report', routeBugreport);
router.use('/comment', routeComment);
router.use('/follows', routeFollows);
router.use('/like', routeLike);
router.use('/notif', routeNotif);
router.use('/posting', routePosting);
router.use('/random', routeRandomPhoto);
router.use('/report', routeReportPosting);
router.use('/search', routeSearch);
router.use('/user', routeUsers);
router.use('/otp', routeOtp);
router.use('/forgot-pass', routeForgotPass);

module.exports = router;