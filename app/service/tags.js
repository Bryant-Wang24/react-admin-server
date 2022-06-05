'use strict';
const Service = require('egg').Service;
class TagsService extends Service {
  async index(params) {
    const { ctx } = this;
    const page = params.page * 1 || 1;
    const pageSize = params.pageSize * 1 || 10;
    // name是模糊匹配
    const queryCon = params.name ? { name: { $regex: new RegExp(params.name, 'i') } } : {};
    const totalCount = await ctx.model.Tags.find(queryCon).countDocuments();
    const data = await ctx.model.Tags.find(queryCon).sort({ createTime: -1 }).skip((page - 1) * pageSize)
      .limit(pageSize);
    return {
      data: {
        page,
        pageSize,
        totalCount,
        list: data,
      },
    };
  }
  async create(params) {
    const { ctx } = this;
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
  async update(params) {
    const { ctx } = this;
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
      createTime: new Date(),
      ...params,
      updateTime: new Date(),
    };
    const res = await ctx.model.Tags.updateOne(
      {
        _id: params.id,
      },
      data
    );
    return {
      code: 0,
      msg: '标签更新成功',
      data: res,
    };
  }
  async destory(id) {
    const { ctx } = this;
    const oldTags = await ctx.model.Tags.findOne(
      {
        _id: id,
      }
    );
    if (!oldTags) {
      return {
        code: -1,
        msg: '标签不存在',
      };
    }
    const res = await ctx.model.Tags.deleteOne(
      {
        _id: id,
      }
    );
    return {
      code: 0,
      msg: '标签删除成功',
      data: res,
    };
  }
}
module.exports = TagsService;
