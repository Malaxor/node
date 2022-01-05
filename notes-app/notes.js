const fs = require('fs');

const getNotes = function() {
  return 'Your notes...';
}

const addNote = function(title, body) {
  const notes = loadNotes();
  const duplicateExists = notes.find(note => note.title === title);

  if (!duplicateExists) {
    notes.push({ title, body });
    saveNotes(notes);
  } else {
    console.log('Note title taken.')
  }
}

const removeNote = function(title) {
  const notes = loadNotes();
  const notesToKeep = notes.filter(note => note.title !== title);
  saveNotes(notesToKeep);
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