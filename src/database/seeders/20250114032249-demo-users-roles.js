module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Users_Roles', [
            {
                user_id: 1, // John Doe
                role_id: 1, // Admin
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                user_id: 2, 
                role_id: 1, 
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                user_id: 2, 
                role_id: 2, 
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                user_id: 2, 
                role_id: 3, 
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                user_id: 3, 
                role_id: 2, 
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                user_id: 4, 
                role_id: 3, 
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },
    down: async (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Users_Roles', null, {});
    },
};
