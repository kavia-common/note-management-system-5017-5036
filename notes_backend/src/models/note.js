const { v4: uuidv4 } = require('uuid');

// PUBLIC_INTERFACE
/**
 * Note Model class
 * Represents a Note object with id, title, content, createdAt, and updatedAt fields.
 */
class Note {
  /**
   * Create a new Note.
   * @param {object} params
   * @param {string} params.title - Title of the note
   * @param {string} params.content - Content of the note
   * @returns {Note}
   */
  constructor({ title, content }) {
    this.id = uuidv4();
    this.title = title;
    this.content = content;
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
  }
}

module.exports = Note;
