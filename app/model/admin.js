module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  // const conn = app.mongooseDB.get('db1');
  const AdminSchema = new Schema({
    userName: { type: String },
    password: { type: String },
  }, {
    collection: 'admin', // 默认的查找集合名称，不加他会查找admins
    versionKey: false,
  });
  return mongoose.model('Admin', AdminSchema);
};
