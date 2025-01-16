const bcrypt = require('bcrypt');
module.exports = {
    up: async (queryInterface, Sequelize) => {
        const hashedPassword = await bcrypt.hash('password', 10);
        return queryInterface.bulkInsert('Users', [
            {
                username: 'johndoe',
                password: hashedPassword,
                email: 'example@example.com',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                username: 'ivanmartin',
                password: hashedPassword,
                email: 'ivan@example.com',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                username: 'lhaira07',
                password: hashedPassword,
                email: 'lhaira@example.com',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                username: 'Alice Johnson',
                password: hashedPassword,
                email: 'alice@example.com',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Users', null, {});
    },
};