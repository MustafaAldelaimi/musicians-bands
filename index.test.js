
const {sequelize} = require('./db');
const {Band, Musician, Song} = require('./index')

describe('Band and Musician Models', () => {
    /**
     * Runs the code prior to all tests
     */
    beforeAll(async () => {
        // the 'sync' method will create tables based on the model class
        // by setting 'force:true' the tables are recreated each time the 
        // test suite is run
        await sequelize.sync({ force: true });

        band1 = await Band.create({name: 'Beatles', genre: 'Rock', showCount: 3});
        band2 = await Band.create({name: 'Queen', genre: 'Rock', showCount: 2});
        
        musician1 = await Musician.create({name: 'Joe', instrument: 'Guitar'});
        musician2 = await Musician.create({name: 'Bob', instrument: 'Violin'});

        song1 = await Song.create({title: 'Bohemian Rhapsody', year: 1234});
        song2 = await Song.create({title: 'Among Us', year: 2023});
    })

    test('can create a Band', async () => {
        // TODO - test creating a band
        expect(band1).toBeInstanceOf(Band);
    })

    test('can create a Musician', async () => {
        // TODO - test creating a musician
        expect(musician1).toBeInstanceOf(Musician)
    })

    test('can create a Song', async () => {
        // TODO - test creating a song
        expect(song1).toBeInstanceOf(Song);
    })

    test('a band can have many musicians', async () => {
        band1.addMusician([musician1,musician2]);
        const musicians = await band1.getMusicians();
        expect(musicians.length).toEqual(2);
        expect(musicians[0].name).toEqual('Joe');
        expect(musicians[1].name).toEqual('Bob');
    })

    test('a musician can only belong to one band', async () => {
        await musician1.setBand(band1);
        let bands = await musician1.getBand();
        expect(bands.name).toEqual('Beatles');

        await musician1.setBand([band1, band2]).catch(err => {
            expect(err.message).toEqual('SQLITE_CONSTRAINT: FOREIGN KEY constraint failed')
        });
    })

    test('a band can have many songs', async () => {
        await band1.addSong([song1, song2]);
        const songs = await band1.getSongs();
        expect(songs.length).toBe(2);
        expect(songs[0].title).toEqual('Bohemian Rhapsody');
        expect(songs[1].title).toEqual('Among Us');
    })

    test('a song can belong to many bands', async () => {
        await song1.addBands([band1,band2]);
        const bands = await song1.getBands();
        expect(bands.length).toBe(2);
        expect(bands[0].name).toBe('Beatles');
        expect(bands[1].name).toBe('Queen');
    })

    test('eager loading works', async () => {
        const band_eager = await Band.findAll({
            include: [
                {
                    model: Musician,
                    as: 'musicians',
                },
                {
                    model: Song,
                    as:'songs',
                }
            ]
        })
        console.log(band_eager);
        const musician_eager = band_eager[0].musicians[0].name
        const song_eager = band_eager[0].songs[0].title
        expect(musician_eager).toBe('Bob');
        expect(song_eager).toBe('Bohemian Rhapsody');
    })

});