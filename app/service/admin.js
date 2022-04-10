const Service = require('egg').Service;
class AdminService extends Service {
  async adminLogin(body) {
    const { ctx } = this;
    console.log('body', body);
    const res = await ctx.model.Admin.create(body);
    return res;
  }
}
module.exports = AdminService;
