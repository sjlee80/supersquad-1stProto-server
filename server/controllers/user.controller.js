const UserInfo = require('../models/userInfo.model');

module.exports = {
  registerUserName: async (req, res) => {
    try {
      const { email, nickname } = req.body;

      const updateUser = await UserInfo.findOneAndUpdate(
        { email: email },
        { $set: { nickname: nickname } },
        { new: true }
      );

      if (!updateUser) {
        return res.status(404).json({
          error: 'User not found',
        });
      }

      res.status(200).json({
        message: 'User nickname update',
        userInfo: {
          userInfoId: updateUser._id,
          nickname: updateUser.nickname,
        },
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: 'Internal Server Error',
      });
    }
  },
  registerAddress: async (req, res) => {
    try {
      const { email, address } = req.body;

      const updateUser = await UserInfo.findOneAndUpdate(
        { email: email },
        { $set: { address: address } },
        { new: true }
      );

      if (!updateUser) {
        return res.status(404).json({
          error: 'User not found',
        });
      }

      res.status(200).json({
        message: 'User nickname update',
        userInfo: {
          userInfoId: updateUser._id,
          address: updateUser.address,
        },
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: 'Internal Server Error',
      });
    }
  },
  getUserInfo: async (req, res) => {
    try {
      const userInfoId = req.params.userInfoId;

      const userInfo = await UserInfo.findById(userInfoId);

      if (!userInfo) {
        return res.status(404).json({
          error: 'User not found',
        });
      }

      res.status(200).json({
        message: 'User info',
        userInfo: userInfo,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: 'Internal Server Error',
      });
    }
  },
  createUser: async (req, res) => {
    try {
      const { email, nickname, address } = req.body;

      const userRegisterData = {
        email: email,
        nickname: nickname,
        address: address,
      };

      const userData = await UserInfo.create(userRegisterData);

      res.status(200).json({
        message: 'User registered',
        userInfoId: userData._id,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: 'Internal Server Error',
      });
    }
  },
};
