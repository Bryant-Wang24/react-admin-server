const Service = require('egg').Service;
class AdminService extends Service {
  async adminLogin(params) {
    const { ctx,app } = this;
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
    const token = app.jwt.sign({...oldUser}, app.config.jwt.secret, {
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
    };


    // const res = await ctx.model.Admin.create(params);
    // return res;
  }
}
module.exports = AdminService;
