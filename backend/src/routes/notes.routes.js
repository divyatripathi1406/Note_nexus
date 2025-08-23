const router = require("express").Router();
const auth = require("../middleware/auth");
const {
  uploadNote,
  listNotes,
  deleteNote,
} = require("../controllers/note.controller");

const multer = require("multer");
const { v4: uuid } = require("uuid");
const path = require("path");

const storage = multer.diskStorage({
  destination: (_req, _file, cb) =>
    cb(null, path.join(process.cwd(), "uploads")),
  filename: (_req, file, cb) =>
    cb(null, `${uuid()}${path.extname(file.originalname)}`),
});
const upload = multer({ storage });

router.post("/", auth, upload.single("file"), uploadNote);
router.get("/", auth, listNotes);
router.delete("/:id", auth, deleteNote);

module.exports = router;
