const fs = require('fs');
const chalk = require('chalk');
const { log } = console;

const getNotes = function() {
  return 'Your notes...';
}

const addNote = function(title, body) {
  const notes = loadNotes();
  const duplicateExists = notes.find(note => note.title === title);

  if (!duplicateExists) {
    notes.push({ title, body });
    saveNotes(notes);
    log(chalk.black.bgGreen('Note added.'));
  } else {
    log(chalk.black.bgRed('Note title exists'));
  }
}

const removeNote = function(title) {
  const notes = loadNotes();
  const notesToKeep = notes.filter(note => note.title !== title);
  
  if (notes.length === notesToKeep.length) {
    log(chalk.black.bgRed('Note not found'));
  } else {
    log(chalk.black.bgGreen('Note removed.'));
    saveNotes(notesToKeep);
  }
}

const loadNotes = function () {
  try {
    return JSON.parse(fs.readFileSync('notes.json'));
  } catch (err) {
    return [];
  }
}

const saveNotes = function(notes) {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync('notes.json', dataJSON);
}

module.exports = {
  getNotes,
  addNote,
  removeNote
};