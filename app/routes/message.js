const MessageController = require("../controllers/message");
const { verifyLogin } = require("../middleware/auth");
module.exports = (express) => {
  const router = express.Router();
  router.get("/",verifyLogin, MessageController.getAllUsersMessages);
  return router;
};