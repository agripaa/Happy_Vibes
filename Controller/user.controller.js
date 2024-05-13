const Users = require('../Models/usersData.model.js');
const argon2 = require('argon2');
const path = require('path');
const validatePassword = require('../middleware/password.validation.js');
const moment = require('moment');
require('dotenv').config();
const Posting = require('../Models/postingData.model.js');
const { unlinkSync, existsSync } = require('fs');
const db = require('../Config/database.js');
const { Op } = require('sequelize');
const Background = require('../Models/backgroundData.model.js');
const Follows = require('../Models/followsData.model.js');
const CodeOTP = require('../Models/codeOTP.model.js');
const { generateOTP, sendOTP } = require('./otp.controller.js');
const ImageProfile = require('../Models/imageProfileData.model.js');
const { getRandomPhoto } = require('./randomPhoto.controller.js');
const { attributesFollowingId, attributesBackground, attributesImageProfile } = require('../utils/attributes.utils.js');

module.exports = {
  async getUsers(req, res) {
    try {
      const { userId } = req;
  
      const user = await Users.findAll({
        where: {
          id: {
            [Op.not]: userId,
          },
          verify: true
        },
        order: db.random(),
        limit: 3,
        include: [
          {
            model: Follows,
            as: 'followers',
            attributes: attributesFollowingId
          },
          {
            model: Background,
            attributes: attributesBackground
          },
          {
            model: ImageProfile,
            attributes: attributesImageProfile
          }
        ]      
      });
      if(!user) return res.status(404).json({status: 404, msg:"No have data!"})
      res.status(200).json({ status: 200, result: user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: 500, result: 'Terjadi kesalahan saat mengambil data pengguna' });
    }
  },
  async getUserId(req, res){
    const { uuid } = req.params;
    const { userId } = req;
    try {
      const user = await Users.findOne({
        where: {
          uuid: {
            [Op.eq]: uuid
          }
        },
        include: [
          {
            model: Background,
            attributes: attributesBackground
          },
          {
            model: ImageProfile,
            attributes: attributesImageProfile
          }
        ]    
      });

      if(user.id === userId) return res.status(403).json({status: 403, msg: 'Cannot see your profile in here'})
      if(!user) return res.status(404).json({ status: 404, msg: 'User not found' });

      return res.status(200).json({ status: 200, result: user });
    } catch (err) {
      console.error(err);
      res.status(500).json({ status: 500, msg: err.message });
    }
  },
  shuffleArray(array) {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  },
  async createUser(req, res) {
    const { name, username, email, password, confPassword } = req.body;
    
    const validatePass = validatePassword(password);
    if(validatePass['regex'] === "false" || validatePass['regex_symbol'] === 'false') return res.status(402).json({status: 400, msg: "The password must be at least 8 characters, there is one capital, one number and certain symbols are prohibited"})
    if(module.exports.validateName(name)) return res.status(403).json({status:403, msg: 'Name must be a min of 3 char and a max of 25 char'})
    if(module.exports.validateUsername(username)) return res.status(408).json({status:403, msg: 'Username must be a min of 3 char and a max of 15 char'})
        if(password !== confPassword) return res.status(400).json({status: 400, msg: 'Password and Confirm Password do not match'})
        const hashPassword = await argon2.hash(password);

        const validationEmail = await Users.findOne({ where: { email: email } });
        if (validationEmail) return res.status(409).json({ status: 409, msg: 'Email already exists' });
        
        try {
            const OTP = generateOTP();
            const profile = await getRandomPhoto();

            if (!profile) return res.status(403).json({status: 403, msg: "Random photo is null"});
            if (!OTP) return res.status(403).json({status: 402, msg: "OTP is not genereated"});
            console.log(`otp code : ${OTP}`);

            sendOTP(email, OTP);

            const image_profile = await ImageProfile.create({
              url_image: profile,
              name_image: username
            })

            const otp = await CodeOTP.create({
              otp: OTP,
            })
            
            const background = await Background.create({
              name_bg: null,
              url_bg: null
            })
            
            await Users.create({
                name: name, 
                username: username,
                email: email,
                password: hashPassword,                     
                image_profile: image_profile.id,
                verify_id: otp.id,
                backgroundId: background.id,
                createdAt: moment().toISOString()
              });
              
            res.status(200).json({status: 200, msg: 'data user created successfully'});
        } catch (err) {
            console.error(err);
            res.status(500).json({status: 500, msg: err.message, err});
            return false; 
        }
    },
    validateName(name){
        return name.length < 3 || name.length > 25
    },
    validateUsername(username){
      return username.length < 3 || username.length > 15
  },
    async updateUser(req, res) {
      let profile_img;
      const {files} = req;
      let { desc } = req.body;
    
      try {
        const user = await Users.findOne({ where: { id: req.userId } });
        if (!user) return res.status(404).json({ status: 404, msg: 'User not found' });

        if (!desc) desc = user.desc;
        if (!files) {
          profile_img = user.name_img;
        } else {
          profile_img = user.name_img;

          let {file} = files;
          let size = file.data.length;
          let profileExtend = path.extname(file.name);
          profile_img = `user_${file.md5}${profileExtend}`;
    
          let allowedTypePhotos = ['.jpg', '.png', '.jpeg', '.bmp', '.heif', '.psd', '.raw', '.gif'];
    
          if (!allowedTypePhotos.includes(profileExtend.toLowerCase())) return res.status(422).json({ msg: 'Invalid image' });
          if (size > 5000000) return res.status(422).json({ msg: 'Images must be less than 5MB' });
    
          file.mv(`./public/users/${profile_img}`, async (err) => {
            if (err) return res.status(500).json({ status: 500, msg: 'Internal server error', err: err.message });
          });
        }
        const profile_url = `${req.protocol}://${req.get('host')}/users/${profile_img}`;

        await Users.update(
          {
            desc: desc
          },
          {
            where: { id: user.id }
          }
        )
        await ImageProfile.update({
          url_image: profile_url,
          name_image: profile_img,
        }, {where: { id: user.image_profile }})

        res.status(200).json({ status: 200, msg: 'User updated successfully' });
      } catch (err) {
        console.error(err);
        res.status(500).json({ status: 500, msg: 'Internal server error', err: err.message });
      }
    },

    async deleteUser(req, res) {
        const {userId} = req;

        const user = await Users.findOne({
            where: {id: userId}
        });

        const image_profile = await ImageProfile.findOne({
          where: {id: user.image_profile}
        });

        const background_image = await Background.findOne({
          where: {id: user.backgroundId}
        });

        if(userId !== user.id) return res.status(400).json({status: 400, msg: "You cannot delete this account!"})

        try {
          const photosToKeep = [
            'user_36da66ab4324b049f8032a2ae1cc12c4.jpeg',
            'user_053c88cf369f519d289b99d6119049f5.jpg',
            'user_60ef0bd9ba36c2c165e00be9b9a19dcd.jpg',
            'user_c13354bf51f1ce36d3e652b409e37f54.jpg',
            'user_db15b37020a2fbb05b69fa1157f0bbfa.jpg',
            'user_ff0b300a0e11132de2c89be1d79da25e.jpeg'
        ];

              if (image_profile.name_image && !photosToKeep.includes(image_profile.name_image)) {
                const nameImgPath = `./public/users/${image_profile.name_image}`;
                if (existsSync(nameImgPath)) {
                    unlinkSync(nameImgPath);
                }
            }

            if(background_image.name_bg !== null){
                unlinkSync(`./public/users/bg_img/${background_image.name_bg}`, (err) => {
                    if (err) return res.status(500).json({status: 500, msg: "Internal server error", error: err})
                })
            }

            const postings = await Posting.findAll({
                where: { userId: user.id }
            });
            
            if(postings){
              for (const posting of postings) {
                  if (posting.name_img) {
                      await unlinkSync(`./public/postings/${posting.name_img}`);
                  }
                  await posting.destroy();
              }
            }

            await user.destroy();
            return res.status(200).json({status:200, msg: "User has been deleted"});
        } catch (err) {
            console.error(err);
            res.status(500).json({ status: 500, msg: 'Internal server error', err: err.message });
        }
    },
};