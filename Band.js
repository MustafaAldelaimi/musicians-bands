const {Sequelize, sequelize} = require('./db');

// TODO - define the Band model
let Band;

Band = sequelize.define("Band", {
    name: Sequelize.STRING,
    genre: Sequelize.STRING,
    showCount: Sequelize.INTEGER
})

module.exports = {
    Band
};