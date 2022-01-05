const chalk = require('chalk');
const yargs = require('yargs');
const { addNote, getNotes, removeNote } = require('./notes');
const { log } = console;

// customize yargs version
yargs.version('1.1.0');

// add command
yargs.command({
  command: 'add',
  describe: 'Add a note',
  builder: {
    title: {
      descibe: 'Note title',
      demandOption: true,
      type: 'string'
    },
    body: {
      descibe: 'Note body',
      demandOption: true,
      type: 'string'
    }
  },
  handler(argv) {
    addNote(argv.title, argv.body);
  }
});

// remove command
yargs.command({
  command: 'remove',
  describe: 'remove a note',
  builder: {
    title: {
      description: 'Note title',
      demandOption: true,
      type: 'string'
    }
  },
  handler(argv) {
    removeNote(argv.title);
  }
});

// read command
yargs.command({
  command: 'read',
  describe: 'read a note',
  handler() {
    log('reading the note.')
  }
});

// list command
yargs.command({
  command: 'list',
  describe: 'list all the notes',
  handler() {
    log('listing all the notes.')
  }
});

// execute the parsing
yargs.parse();
