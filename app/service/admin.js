'use strict';
const Service = require('egg').Service;
class AdminService extends Service {
  async adminLogin(params) {
    const { ctx, app } = this;
    const oldUser = await ctx.model.Admin.findOne({
      username: params.username,
    });
    console.log('oldUser', oldUser);
    if (!oldUser) {
      return {
        code: -1,
        msg: '用户名不存在',
      };
    }
    const isMatch = await ctx.helper.comparePassword(params.password, oldUser.password);
    if (!isMatch) {
      return {
        code: -1,
        msg: '用户名或密码错误',
      };
    }
    const token = app.jwt.sign({ ...oldUser }, app.config.jwt.secret, {
      expiresIn: '1h', // 过期时间
    });
    ctx.cookies.set('token', token, {
      maxAge: 1000 * 60 * 60,
      httpOnly: true,
    });
    return {
      data: {
        token,
        username: oldUser.username,
      },
      msg: '登录成功',
    };


    // const res = await ctx.model.Admin.create(params);
    // return res;
  }
  async adminLogout() {
    const { ctx } = this;
    ctx.cookies.set('token', null, {
      maxAge: 0,
      httpOnly: true,
    });
    return {
      code: 0,
      msg: '退出成功',
    };
  }
}
module.exports = AdminService;
