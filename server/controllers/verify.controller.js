const multer = require('multer');
const fs = require('fs');

const ChallengeInfo = require('../models/challengeInfo.model');
const UserChallenge = require('../models/userChallenge.model');
const VerificationPhoto = require('../models/verificationPhoto.model');

// diskStorage를 사용할 경우
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/veriPhoto/');
  },
  filename: function (req, file, cb) {
    const date = new Date();
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    const timestamp = `${year}${month}${day}-${hours}${minutes}${seconds}`;
    cb(null, file.fieldname + '-' + timestamp);
  },
});

const upload = multer({ storage: storage });

module.exports = {
  postPhoto: async (req, res) => {
    try {
      upload.single('veriPhoto')(req, res, async (err) => {
        if (err || !req.file) {
          //console.log(err);
          return res.status(400).json({ error: 'Failed to upload file.' });
        }
        const veriPhotoInfo = req.file;
        const userChallengeId = req.body.userChallengeId;

        const verificationPhoto = await VerificationPhoto.create({
          verificationPhoto: veriPhotoInfo.path,
          uploadedAt: Date.now(),
          adminCheckedAt: null,
          adminCheckStatus: null,
          userChallenge_id: userChallengeId,
        });

        res.status(200).json({
          message: 'Photo uploaded',
          verificationPhotoInfo: {
            verificationPhotoId: verificationPhoto._id,
            uploadedAt: verificationPhoto.uploadedAt,
          },
        });
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: 'Internal Server Error',
      });
    }
  },
  verifyPhoto: async (req, res) => {
    try {
      const verificationInfo = req.body;
      //console.log(verificationInfo);

      const verificationPhoto = await VerificationPhoto.findById(
        verificationInfo.verificationPhotoId
      );

      if (!verificationPhoto) {
        return res.status(404).json({
          error: 'Verification Photo not found',
        });
      }

      const updatedVerificationPhoto = await VerificationPhoto.findByIdAndUpdate(
        verificationInfo.verificationPhotoId,
        {
          adminCheckedAt: Date.now(),
          adminCheckStatus: verificationInfo.adminCheckStatus,
        },
        {
          new: true,
        }
      );

      res.status(200).json({
        message: 'Verification Photo updated',
        CheckedAdminInfo: {
          adminCheckStatus: updatedVerificationPhoto.adminCheckStatus,
          adminCheckedAt: updatedVerificationPhoto.adminCheckedAt,
          userChallengeId: updatedVerificationPhoto.userChallenge_id,
        },
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: 'Internal Server Error',
      });
    }
  },
  getAllPhotos: async (req, res) => {
    try {
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: 'Internal Server Error',
      });
    }
  },
  getPhotoById: async (req, res) => {
    try {
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: 'Internal Server Error',
      });
    }
  },
};
