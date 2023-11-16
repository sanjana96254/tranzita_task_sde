const sql = require('mssql');
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('tempdb', 'sa', '12345', {

    define: {
        freezeTableName: true,
        timestamps: true,
        // updatedAt: 'updated_at'
    },
    host: 'localhost',
    dialect: 'mssql',
    port: 1433
});

// const app = express();
// const port = 3000;

//config for database
const config = {
    user: 'sa',
    password: '12345',
    server: 'localhost',
    database: 'tempdb',
    options: {
        encrypt: true,
        trustServerCertificate: true,
    },
};


try {
    sequelize.authenticate();
    sql.connect(config);
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

const User = sequelize.define('user', {
    // model attributes are defined here
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    firstName: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'first_name'
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'last_name'
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    address: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

const user = new User({
    firstName: 'Abhi',
    lastName: 'Saxena',
    email: 'saxena.abhi7007@gmail.com',
    address: 'Gorakhpur'
});

const user1 = new User({
    firstName: 'Ankita',
    lastName: 'Jaiswal',
    email: 'jaiswal.intoxicated7007@gmail.com',
    address: 'Gorakhpur'
});
const user2 = new User({
    firstName: 'Sanjana',
    lastName: 'Agrawal',
    email: 'sanjanaagrawal63@gmail.com',
    address: 'Gorakhpur'
});

sequelize.sync({ alter: true }).then(async () => {
    try {
        // Save the first user
        const savedUser = await user.save();
        console.log("User saved successfully:", savedUser);

        // Save the second user
        const savedUser1 = await user1.save();
        console.log("User1 saved successfully:", savedUser1);
    } catch (err) {
        console.error('Error saving user:', err);
    } finally {
        // Close the database connections if needed
        await sequelize.close();
        await sql.close();
    }
}).catch(error => {
    console.error('Error syncing the database:', error);
});