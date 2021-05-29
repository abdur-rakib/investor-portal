const express = require('express');
const AdminBro = require('admin-bro');
const mongoose = require('mongoose');
const options = require('../admin/admin.option');
const buildAdminRouter = require('../admin/admin.router');

require('dotenv').config();

const app = express();
const port = 3000;

const run = async () => {
    await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    const admin = new AdminBro(options);
    const router = buildAdminRouter(admin);
    app.use(admin.options.rootPath, router);

    app.use(express.json());
    // custom route
    app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`);
    });
};

module.exports = run;
