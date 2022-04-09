'use strict';

const Controller = require('egg').Controller;

class NewsController extends Controller {
  async list() {
    const { ctx, service } = this;
    console.log('this.service', this.service);
    const dataList = {
      list: [
        { id: 1, title: 'this is news 1', url: '/news/1' },
        { id: 2, title: 'this is news 2', url: '/news/2' },
      ],
    };
    ctx.body = await service.news.list();
    // await ctx.render('news/list.tpl', dataList);
  }
}

module.exports = NewsController;
