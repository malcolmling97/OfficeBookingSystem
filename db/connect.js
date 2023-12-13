const { sequelize } = require("./init");
const { setup } = require("./setup");

const connect = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    await setup();

    console.log("Connection to database was successful");
  } catch (error) {
    console.error("Unable to connect to the database", error);
  }
};

exports.connect = connect;
