
const {sequelize} = require('./db');
const {Band, Musician} = require('./index')

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
    })

    test('can create a Band', async () => {
        // TODO - test creating a band
        expect(band1).toBeInstanceOf(Band);
    })

    test('can create a Musician', async () => {
        // TODO - test creating a musician
        expect(musician1).toBeInstanceOf(Musician)
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
})