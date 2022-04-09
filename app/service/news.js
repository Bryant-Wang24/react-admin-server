const Service = require('egg').Service;
class NewsService extends Service {
  async list() {
    const { ctx } = this;
    const { serverUrl, limit } = this.config.news;
    const res = await this.ctx.curl(`${serverUrl}?limit=${limit}`, {
      dataType: 'json',
    });
    const date = ctx.helper.relativeTime(new Date());
    console.log('date', date);
    return res.data.data;
  }
}
module.exports = NewsService;
