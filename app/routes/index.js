
const authRoutes = require("./auth");
const messageRoutes = require("./message")
module.exports = (express) => {
  const router = express.Router();
  // configuration here
  router.get("/", (req, res) => {
    res.send("Hello World!");
  });

  router.use("/auth", authRoutes(express));
  router.use("/message",messageRoutes(express))
  return router;
};