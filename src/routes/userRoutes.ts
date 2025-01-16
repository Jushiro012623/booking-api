const { Router } = require("express");
const user = require('../controllers/userController');
const router = Router();
const permissionMiddleware = require('../middlewares/permissionMiddleware');
const {isGuest, isAuthenticated} = require('../middlewares/authMiddleware')

router.post("/login", isGuest ,user.login);
router.post("/register",isGuest, user.register);

module.exports = router;
