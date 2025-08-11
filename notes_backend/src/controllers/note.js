const { validationResult } = require('express-validator');
const noteService = require('../services/note');

/**
 * Error handling helper
 */
function handleValidationErrors(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 'error',
      errors: errors.array().map(e => ({ field: e.param, message: e.msg })),
    });
  }
  return null;
}

// PUBLIC_INTERFACE
/**
 * NotesController for notes CRUD endpoints.
 */
class NotesController {
  /**
   * Get all notes.
   */
  getAll(req, res) {
    const notes = noteService.getAllNotes();
    res.json({ status: 'success', data: notes });
  }

  /**
   * Create a note.
   */
  create(req, res) {
    const validation = handleValidationErrors(req, res);
    if (validation) return;
    const { title, content } = req.body;
    const note = noteService.createNote({ title, content });
    res.status(201).json({ status: 'success', data: note });
  }

  /**
   * Get a note by id.
   */
  getOne(req, res) {
    const validation = handleValidationErrors(req, res);
    if (validation) return;
    const note = noteService.getNoteById(req.params.id);
    if (!note) {
      return res.status(404).json({
        status: 'error',
        message: 'Note not found',
      });
    }
    res.json({ status: 'success', data: note });
  }

  /**
   * Update a note.
   */
  update(req, res) {
    const validation = handleValidationErrors(req, res);
    if (validation) return;
    const note = noteService.updateNote(req.params.id, req.body);
    if (!note) {
      return res.status(404).json({
        status: 'error',
        message: 'Note not found',
      });
    }
    res.json({ status: 'success', data: note });
  }

  /**
   * Delete a note.
   */
  delete(req, res) {
    const validation = handleValidationErrors(req, res);
    if (validation) return;
    const deleted = noteService.deleteNote(req.params.id);
    if (!deleted) {
      return res.status(404).json({
        status: 'error',
        message: 'Note not found',
      });
    }
    res.status(204).send();
  }
}

module.exports = new NotesController();
