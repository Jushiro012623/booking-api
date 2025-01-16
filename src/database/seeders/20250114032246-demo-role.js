module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Roles', [
            {
                label: 'Admin',
                name: 'admin',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                label: 'User',
                name: 'user',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                label: 'Termninal',
                name: 'termninal',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Roles', null, {});
    },
};
