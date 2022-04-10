const helper = require('../extend/helper');
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  // const conn = app.mongooseDB.get('db1');
  const AdminSchema = new Schema({
    username: { type: String },
    password: { type: String },
  }, {
    collection: 'admin', // 默认的查找集合名称，不加他会查找admins
    versionKey: false,
  });
  const AdminModel = mongoose.model('Admin', AdminSchema);
  const adminUser = {
    username: 'admin',
    password: '123456',
  };
  helper.genSaltPassword(adminUser.password).then(async hash => {
    adminUser.password = hash;
    const oldUser = await AdminModel.findOne({ username: adminUser.username });
    if (!oldUser) {
      await AdminModel.create(adminUser);
    }
  });
  return AdminModel;
};
