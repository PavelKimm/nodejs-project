const router = require("express").Router();

const authMiddleware = require("../middleware/authMiddleware");
const AuthApi = require("./api/authApi");

router.post("/register", AuthApi.register);
router.post("/login", AuthApi.login);
router.delete("/accounts/delete", authMiddleware, AuthApi.deleteAccount);
router.post("/validate-jwt", AuthApi.validateJwt);
router.get("/current-user-data", authMiddleware, AuthApi.getCurrentUserData);

module.exports = router;
