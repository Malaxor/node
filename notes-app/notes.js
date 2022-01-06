const fs = require('fs');
const chalk = require('chalk');
const { log } = console;

const getNotes = () => {
  return 'Your notes...';
}

const addNote = (title, body) => {
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

const removeNote = (title) => {
  const notes = loadNotes();
  const notesToKeep = notes.filter(note => note.title !== title);
  
  if (notes.length === notesToKeep.length) {
    log(chalk.black.bgRed('Note not found'));
  } else {
    log(chalk.black.bgGreen('Note removed.'));
    saveNotes(notesToKeep);
  }
}

const loadNotes = () => {
  try {
    return JSON.parse(fs.readFileSync('notes.json'));
  } catch (err) {
    return [];
  }
}

const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync('notes.json', dataJSON);
}

module.exports = {
  getNotes,
  addNote,
  removeNote
};