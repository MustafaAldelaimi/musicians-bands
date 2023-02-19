const {Sequelize, sequelize} = require('./db');

let Song

Song = sequelize.define('song', {
          title: Sequelize.STRING,
          year: Sequelize.INTEGER
})

module.exports = {
          Song
}