const bcrypt = require('bcrypt');

exports.before = async (request) => {
    if (request.payload.password) {
        request.payload = {
            ...request.payload,
            encryptedPassword: await bcrypt.hash(request.payload.password, 10),
            password: undefined,
        };
    }
    return request;
};
