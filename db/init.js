const { Sequelize } = require("sequelize");
const { DB_URI } = require("../constant");

exports.sequelize = new Sequelize(DB_URI, {
    ssl: {
        require: true,
        rejectUnauthorized: false
    }
});
