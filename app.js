const notes = require('./notes.js')
const chalk = require('chalk')
const yargs = require('yargs')

//Customize Yargs version
yargs.version('1.1.0');

//create add command

yargs.command({
    command:'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Body of the note',
            demandOption: true,
            type: 'string'

        }
    },
    handler(argv){
        notes.addNotes(argv.title, argv.body)
    }
})

yargs.command({
    command:'remove',
    describe: 'Remove a note',
    builder:{
        title:{
            describe:'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        notes.removeNotes(argv.title)
    }
})

yargs.command({
    command:'list',
    describe: 'Listing all the notes',
    handler(){
        notes.listNotes()
    }
})

yargs.command({
    command:'read',
    describe: 'Read a specific note',
    builder:{
        title:{
            describe:'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        notes.readNote(argv.title)
    }
})





//add, remove, read, list

yargs.parse()