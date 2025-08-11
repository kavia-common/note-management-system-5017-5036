const Note = require('../models/note');

/**
 * In-memory storage for notes (replace with DB in production).
 */
const notesStore = [];

// PUBLIC_INTERFACE
/**
 * NoteService class provides CRUD operations on notes.
 */
class NoteService {
  /**
   * Get all notes.
   * @returns {Note[]}
   */
  getAllNotes() {
    return notesStore;
  }

  /**
   * Create a new note.
   * @param {object} data - {title, content}
   * @returns {Note}
   */
  createNote(data) {
    const note = new Note(data);
    notesStore.push(note);
    return note;
  }

  /**
   * Get a note by ID.
   * @param {string} id
   * @returns {Note|null}
   */
  getNoteById(id) {
    return notesStore.find(n => n.id === id) || null;
  }

  /**
   * Update a note by ID.
   * @param {string} id
   * @param {object} data
   * @returns {Note|null}
   */
  updateNote(id, data) {
    const note = notesStore.find(n => n.id === id);
    if (!note) return null;
    if (typeof data.title !== 'undefined') note.title = data.title;
    if (typeof data.content !== 'undefined') note.content = data.content;
    note.updatedAt = new Date().toISOString();
    return note;
  }

  /**
   * Delete a note by ID.
   * @param {string} id
   * @returns {boolean} True if deleted, false if not found.
   */
  deleteNote(id) {
    const idx = notesStore.findIndex(n => n.id === id);
    if (idx === -1) return false;
    notesStore.splice(idx, 1);
    return true;
  }
}

module.exports = new NoteService();
