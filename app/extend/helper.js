'use strict';
const moment = require('moment');
const bcrypt = require('bcrypt');

module.exports = {
  moment,
  // 加密
  genSaltPassword(password) {
    return new Promise((resolve, reject) => {
      bcrypt.genSalt(10, (err, salt) => {
        if (err) reject(err);
        bcrypt.hash(password, salt, (err, hash) => {
          if (err) reject(err);
          resolve(hash);
        });
      });
    });
  },
  // 解密
  // * @param {未加密的密码} _password
  // * @param {数据库保存的已经加密的密码} password
  // * @return boolean 是否匹配
  comparePassword(password, hash) {
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, hash, (err, res) => {
        if (err) reject(err);
        resolve(res);
      });
    });
  },

  success({ ctx, res = null }) {
    ctx.status = res.status ? res.status : 200;
    if (res.status) {
      delete res.status;
    }
    ctx.body = {
      ...res,
      data: res.data ? res.data : null,
      code: res.code ? res.code : 0, // 0 成功 1 失败
      msg: res.msg ? res.msg : 'success',
    };
  },
};
