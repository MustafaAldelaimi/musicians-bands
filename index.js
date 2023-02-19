const {Band} = require('./Band')
const {Musician} = require('./Musician')
const {Song} = require('./Song')

Musician.belongsTo(Band)
Band.hasMany(Musician, {as: 'musicians'})

Band.belongsToMany(Song, {through: 'BandSong', as: 'songs'})
Song.belongsToMany(Band, {through: 'BandSong', as: 'bands'})

module.exports = {
    Band,
    Musician,
    Song
};
