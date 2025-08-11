const { body, param } = require('express-validator');

// PUBLIC_INTERFACE
/**
 * Express-validator chains for note routes validation
 */
const createNoteValidation = [
  body('title')
    .exists().bail().withMessage('Title is required')
    .isString().withMessage('Title must be a string')
    .notEmpty().withMessage('Title cannot be empty'),
  body('content')
    .optional().isString().withMessage('Content must be a string'),
];

const updateNoteValidation = [
  body('title')
    .optional()
    .isString().withMessage('Title must be a string')
    .notEmpty().withMessage('Title cannot be empty'),
  body('content')
    .optional().isString().withMessage('Content must be a string'),
];

const noteIdValidation = [
  param('id')
    .exists().bail().withMessage('Note ID is required')
    .isUUID().withMessage('Note ID must be a valid UUID')
];

module.exports = {
  createNoteValidation,
  updateNoteValidation,
  noteIdValidation,
};
