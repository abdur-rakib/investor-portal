const { User } = require('../../models/user');
const { before: passwordBeforeHook } = require('../actions/password.hook');

// is admin
const canModifyAdmin = ({ currentAdmin }) => currentAdmin && currentAdmin.role === 'admin';

// resource options
const options = {
    properties: {
        encryptedPassword: {
            isVisible: false,
        },
        password: {
            type: 'string',
            isVisible: {
                list: false, edit: true, filter: false, show: false,
            },
        },
    },
    actions: {
        new: {
            before: async (request) => passwordBeforeHook(request),
            isAccessible: canModifyAdmin,
        },
        edit: { isAccessible: canModifyAdmin },
        delete: { isAccessible: canModifyAdmin },
        bulkDelete: { isAccessible: canModifyAdmin },
        list: {
            before: async (request, context) => {
                const { currentAdmin } = context;
                const filter = currentAdmin.role === 'admin' ? {
                    ...request.query,
                } : {
                    ...request.query,
                    'filters.email': currentAdmin.email,
                };
                return {
                    ...request,
                    query: {
                        ...filter,
                    },
                };
            },
        },
    },
};

module.exports = {
    options,
    resource: User,
};
