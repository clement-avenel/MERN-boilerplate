// api-routes.js
const auth = require('./middleware/auth');

const port = process.env.PORT || 8080;
// Initialize express router
const router = require('express').Router();

// Import controllers
const dataController = require('./controllers/dataController');
const userController = require('./controllers/userController');

// User routes
router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.delete('/users/:id', userController.delete);
router.put('/users/:id', userController.passwordUpdate);

// Data routes
router.get('/data/all', auth, dataController.index);
router.post('/data', auth, dataController.new);
router.get('/data/:id', dataController.searchById);
router.put('/data/:id', auth, dataController.update);
router.delete('/data/:id', auth, dataController.delete);

// Export API routes
module.exports = router;
