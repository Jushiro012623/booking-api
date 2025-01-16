module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Permissions', [
            {
                name: 'create_user',
                description: 'Can create a user',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'delete_user',
                description: 'Can delete a user',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'update_user',
                description: 'Can update a user',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'view_user',
                description: 'Can view a user',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'view_own_user',
                description: 'Can view his own user',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'update_own_user',
                description: 'Can view his own user',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },
    down: async (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Permissions', null, {});
    },
};
