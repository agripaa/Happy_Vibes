/**
 * @swagger
 * components:
 *   schemas:
 *     users_data:
 *       type: object
 *       required:
 *         - uuid
 *         - name
 *         - username
 *         - email
 *         - password
 *         - backgroundId
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the user account
 *         uuid: 
 *           type: string  
 *           description: id user in unique format randomized
 *         name:
 *           type: string
 *           description: The name of the user account
 *         username:
 *           type: string
 *           description: username user account
 *         desc:
 *           type: string
 *           description: about description of the user account
 *         email:
 *           type: string
 *           description: active email user account
 *         password:
 *           type: string
 *           description: this password will encrypted password user account
 *         name_img:
 *           type: string
 *           description: name as profile image user account
 *         url:
 *           type: string
 *           description: for get profile image user
 *         followedId:
 *           type: string
 *           description: foreign key follower user id
 *         followingId:
 *           type: string
 *           description: foreign key following user id
 *         followerCount:
 *           type: string
 *           description: count of follower user 
 *         followingCount:
 *           type: string
 *           description: count of follower user 
 *         verificationCode:
 *           type: string
 *           description: otp verification code for verification send to email user
 *         backgroundId:
 *           type: string
 *           description: foreign key background image user
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The date the user data was added
 *         updatedAt:
 *           type: string
 *           format: date
 *           description: The date the user data was updated
 *       example:
 *         id: 1
 *         uuid: e942114e-d39f-4248-a527-b12fc36efe0e
 *         name: Alexander K. Dewdney
 *         username: alex
 *         desc: Hello there! This is my first acc on hyv
 *         email: example@hyv.com
 *         password: hashing_password_with_argon2         
 *         name_img: iam.png
 *         url: http://{host}/users/{name_img}
 *         followedId: null
 *         followingId: null
 *         followerCount: 0
 *         followingCount: 0
 *         verification_code: 88432
 *         backgroundId: 1
 *         createdAt: 2024-01-01T04:05:06.157Z
 *         updatedAt: 2024-01-03T04:12:06.157Z
 */