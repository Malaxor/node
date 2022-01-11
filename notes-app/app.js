const yargs = require('yargs');
const { addNote, readNote, removeNote, listNotes } = require('./notes');

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
  builder: {
    title: {
      description: 'Note title',
      demandOption: true,
      type: 'string'
    }
  },
  handler(argv) {
    readNote(argv.title)
  }
});

// list command
yargs.command({
  command: 'list',
  describe: 'list all the notes',
  handler() {
    listNotes();
  }
});

// execute the parsing
yargs.parse();
