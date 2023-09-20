const ChallengeInfo = require('../models/challengeInfo.model');

module.exports = {
  getChallengeAll: async (req, res) => {
    try {
      const challengeInfo = await ChallengeInfo.find({});
      //console.log(challengeInfo);

      const challenges = challengeInfo.map((info) => ({
        challengeId: info._id,
        category: info.category,
        challengeName: info.challengeName,
        challengeStartsAt: info.challengeStartsAt,
        challengeEndsAt: info.challengeEndsAt,
        challengeParticipantsCount: info.challengeParticipantsCount,
        challengeTotalDeposit: info.challengeTotalDeposit,
        challengeThumbnail: info.challengeThumbnail,
      }));

      res.status(200).json({
        message: 'Challenge found',
        challenges,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: 'Internal Server Error',
      });
    }
  },

  getChallengeById: async (req, res) => {
    try {
      const challengeInfo = await ChallengeInfo.findById(req.params.challengeId);

      if (!challengeInfo) {
        return res.status(404).json({
          error: 'Challenge not found',
        });
      }

      res.status(200).json({
        message: 'Challenge found',
        challengeInfo: {
          challengeId: challengeInfo._id,
          challengeName: challengeInfo.challengeName,
          challengeParticipantsCount: challengeInfo.challengeParticipantsCount,
          challengeTotalDeposit: challengeInfo.challengeTotalDeposit,
          challengeStartsAt: challengeInfo.challengeStartsAt,
          challengeEndsAt: challengeInfo.challengeEndsAt,
          challengeVerificationMethod: challengeInfo.challengeVerificationMethod,
          challengeVerificationFrequency: challengeInfo.challengeVerificationFrequency,
          cryptoYield: challengeInfo.cryptoYield,
          challengeThumbnail: challengeInfo.challengeThumbnail,
        },
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: 'Internal Server Error',
      });
    }
  },

  createChallenge: async (req, res) => {
    try {
      const challenge = req.body;

      const challengeInfoName = await ChallengeInfo.findOne({
        challengeName: challenge.challengeName,
      });

      if (challenge.challengeName === '' || challengeInfoName) {
        return res.status(400).json({
          error: 'Challenge already exists or name is empty',
        });
      }

      const challengeInfo = await ChallengeInfo.create(challenge);
      res.status(200).json({
        message: 'Challenge created',
        challengeInfo: {
          challengeId: challengeInfo._id,
          challengeName: challengeInfo.challengeName,
        },
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: 'Internal Server Error',
      });
    }
  },
};
