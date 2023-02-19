const {Band} = require('./Band')
const {Musician} = require('./Musician')
const {Song} = require('./Song')

Musician.belongsTo(Band)
Band.hasMany(Musician)

Band.belongsToMany(Song, {through: 'BandSong'})
Song.belongsToMany(Band, {through: 'BandSong'})

module.exports = {
    Band,
    Musician,
    Song
};
