const AuthController = require("../controllers/auth");
const { verifyLogin } = require("../middleware/auth");
module.exports = (express) => {
  const router = express.Router();
  router.post("/register", AuthController.register);
  router.post("/login", AuthController.login);
  router.get("/verify-login", verifyLogin, AuthController.profile);
  router.post("/logout", verifyLogin, AuthController.logout);
  return router;
};