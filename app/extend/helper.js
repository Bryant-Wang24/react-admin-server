const moment = require('moment');
exports.relativeTime = time => moment(new Date(time)).format('MMM Do YYYY, h:mm:ss a');
