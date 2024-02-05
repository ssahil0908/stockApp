const router=require('express').Router();
const { registerUser, loginUser } = require('../controllers/userController');
const { openAIchat , openAIanalyzeData } = require('../controllers/OpenAI-Controller');
const jwt = require('jsonwebtoken');

// const authenticateJWT = (req, res, next) => {
//   const token = req.header('x-auth-token');
//    console.log('token',token);
//   if (!token) {
//     return res.status(401).json({ error: 'Access denied. No token provided.' });
//   }

//   try {
//     const decoded = jwt.verify(token, '#secretKeySahil#');
//     req.user = decoded;
//     console.log('decoded',decoded);
//     next();
//   } catch (error) {
//     return res.status(400).json({ error: 'Invalid token.' });
//   }
// };

//authorization routes
router.post('/register', registerUser);
router.post('/login', loginUser);


//home route
router.get('/', (req, res) => {
    res.send('Hey buddy!!!');
  });

//openAI route
router.post('/chat',openAIchat);
router.post('/analyze',openAIanalyzeData);

// Protect /chat and /analyze routes using authenticateJWT middleware
// router.post('/chat', authenticateJWT, openAIchat);
// router.post('/analyze', authenticateJWT, openAIanalyzeData);

module.exports = router



