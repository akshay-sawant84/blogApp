const Validator = require('validatorjs');
const responseHelper = require('../helper/responseHelper');
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const models = require('../models');
const User = models.user;

const signup = async (req, res) => {
  try {
    let validationRule = {
      username: 'required|string',
      password: 'required|string|min:6'
    };
    var validation = new Validator(req.body, validationRule);
    if (validation.fails()) {
      return responseHelper.validationResponse(res, validation.errors);
    }

    const username = (req.body.username).toLowerCase();
    const password = await bcryptPassword(req.body.password);
    try {
      await User.create({
        username,
        password
      });

      return responseHelper.successResponse(
        res,
        'User Registered Successfully',
      );
    } catch (error) {
      return responseHelper.catchResponse(res, error.errors[0].message);
    }
  } catch (error) {
    return responseHelper.catchResponse(res, error.message);
  }
};

const login = async (req, res) => {
  try {
    let validationRule = {
      username: 'required|string',
      password: 'required|string',
    };
    var validation = new Validator(req.body, validationRule);
    if (validation.fails()) {
      return responseHelper.validationResponse(res, validation.errors);
    }
    const username = (req.body.username).toLowerCase();
    const password = req.body.password;

    const getUserData = await userLogin(username, password);
    if (getUserData === null) {
      return responseHelper.authError(res, 'Invalid Credential');
    } else {
      let dataObject = {
        id: getUserData.id,
        username: getUserData.username,
      };
      var token = jwt.sign(dataObject, process.env.SECRET_KEY, {
        expiresIn: 86400, // expires in 24 hours
      });
      return responseHelper.successResponse(res, 'Login Successfully', token);
    }
  } catch (error) {
    return responseHelper.catchResponse(res, error.message);
  }
};

const bcryptPassword = (password) => {
  return bcrypt.hash(password, saltRounds);
};

const userLogin = async (username, password) => {
  const getLoginData = await User.findOne({
    where: {
     username: username
    }
  });
  if (getLoginData) {
    const checkPassword = await bcrypt.compare(password, getLoginData.password);
    if (checkPassword) {
      return getLoginData;
    } else {
      return null;
    }
  } else {
    return null;
  }
};

module.exports = { signup, login };
