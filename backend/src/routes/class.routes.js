const router = require("express").Router();
const auth = require("../middleware/auth");
const {
  createClass,
  joinClass,
  myClasses,
  getOne,
} = require("../controllers/class.controller");

router.post("/", auth, createClass);
router.post("/join", auth, joinClass);
router.get("/my", auth, myClasses);
router.get("/:id", auth, getOne);

module.exports = router;
