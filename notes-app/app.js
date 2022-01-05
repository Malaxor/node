const chalk = require('chalk');
const yargs = require('yargs');
const getNotes = require('./notes');
const { log } = console;

// customize yargs version
yargs.version('1.1.0');
console.log(yargs.command)

// create add command
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
    log('Title: ', argv.title)
    log('Body: ', argv.body)
  }
});

// create remove command
yargs.command({
  command: 'remove',
  describe: 'remove a note',
  handler() {
    log('Removing the note.')
  }
});

// create read command
yargs.command({
  command: 'read',
  describe: 'read a note',
  handler() {
    log('reading the note.')
  }
});

// create list command
yargs.command({
  command: 'list',
  describe: 'list all the notes',
  handler() {
    log('listing all the notes.')
  }
});

// execute the parsing
yargs.parse();
