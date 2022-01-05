const chalk = require('chalk');
const yargs = require('yargs');
const getNotes = require('./notes');
const { log } = console;

// customize yargs version
yargs.version('1.1.0');

// create add command
yargs.command({
  command: 'add',
  describe: 'Add a note',
  handler() {
    log('Adding a note.')
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

// add, remove, read, list
log(yargs.argv)
