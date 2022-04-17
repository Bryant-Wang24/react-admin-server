'use strict';
const Service = require('egg').Service;
class TagsService extends Service {
  async create(params) {
    const { ctx, app } = this;
    const oldTags = await ctx.model.Tags.findOne(
      {
        name: params.name,
      }
    );
    if (oldTags) {
      return {
        code: -1,
        msg: '标签已存在',
      };
    }
    const data = {
      ...params,
      createTime: new Date(),
    };
    const res = await ctx.model.Tags.create(data);
    return {
      code: 0,
      msg: '标签创建成功',
      data: res,
    };
  }
  // async adminLogout() {
  //   const { ctx } = this;
  //   ctx.cookies.set('token', null, {
  //     maxAge: 0,
  //     httpOnly: true,
  //   });
  //   return {
  //     code: 0,
  //     msg: '退出成功',
  //   };
  // }
}
module.exports = TagsService;
