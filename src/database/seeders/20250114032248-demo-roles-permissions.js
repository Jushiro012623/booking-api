module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Roles_Permissions', [
            {
                role_id: 1, // Admin
                permission_id: 1, // create_user
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                role_id: 1, // Admin
                permission_id: 2, // delete_user
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                role_id: 1, // Admin
                permission_id: 3, // update_user
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                role_id: 1,
                permission_id: 4,
                createdAt: new Date(),
                updatedAt: new Date(),
            },  
            {
                role_id: 1,
                permission_id: 5,
                createdAt: new Date(),
                updatedAt: new Date(),
            },  
            {
                role_id: 1,
                permission_id: 6,
                createdAt: new Date(),
                updatedAt: new Date(),
            },  
            {
                role_id: 1,
                permission_id: 7,
                createdAt: new Date(),
                updatedAt: new Date(),
            },  
            {
                role_id: 2,
                permission_id: 6,
                createdAt: new Date(),
                updatedAt: new Date(),
            },  
            {
                role_id: 2,
                permission_id: 7,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                role_id: 3,
                permission_id: 3,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                role_id: 4,
                permission_id: 3,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                role_id: 5,
                permission_id: 3,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                role_id: 6,
                permission_id: 3,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },
    down: async (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Roles_Permissions', null, {});
    },
};
