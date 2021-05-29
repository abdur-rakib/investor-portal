const bcrypt = require('bcrypt');
const { buildAuthenticatedRouter } = require('@admin-bro/express');
const { User } = require('../models/user');

require('dotenv').config();

const buildAdminRouter = (admin) => {
    const router = buildAuthenticatedRouter(admin, {
        authenticate: async (email, password) => {
            const user = await User.findOne({ email });
            if (user) {
                const matched = await bcrypt.compare(password, user.encryptedPassword);
                if (matched) {
                    return user;
                }
            }
            return false;
        },
        cookiePassword: process.env.COOKIE_PASSWORD,
    });
    return router;
};

module.exports = buildAdminRouter;
