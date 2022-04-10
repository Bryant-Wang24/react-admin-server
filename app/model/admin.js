module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  // const conn = app.mongooseDB.get('db1');
  const AdminSchema = new Schema({
    userName: { type: String },
    password: { type: String },
  });
  return mongoose.model('User', AdminSchema);
};
