const AdminBro = require('admin-bro');
const AdminBroMongoose = require('@admin-bro/mongoose');
const user = require('./resources/user-resource');

AdminBro.registerAdapter(AdminBroMongoose);

const options = {
    resources: [user],
};

module.exports = options;
