const Note = require("../models/Note");
const path = require("path");
const fs = require("fs");

exports.uploadNote = async (req, res, next) => {
  try {
    if (!req.file) return res.status(400).json({ error: "File is required" });
    const {
      title,
      description,
      subject,
      tags,
      visibility = "public",
      classId,
    } = req.body;

    const note = await Note.create({
      title,
      description,
      subject,
      tags: tags
        ? String(tags)
            .split(",")
            .map((t) => t.trim())
        : [],
      visibility,
      class: visibility === "class" ? classId : undefined,
      fileUrl: `/uploads/${req.file.filename}`,
      uploadedBy: req.user.id,
    });

    res.status(201).json(note);
  } catch (e) {
    next(e);
  }
};

exports.listNotes = async (req, res, next) => {
  try {
    const { q, subject, classId, visibility } = req.query;
    const filter = {};
    if (subject) filter.subject = subject;
    if (visibility) filter.visibility = visibility;
    if (classId) filter.class = classId;
    if (!classId) filter.visibility = "public";
    if (q) filter.title = { $regex: q, $options: "i" };

    const notes = await Note.find(filter).sort({ createdAt: -1 });
    res.json(notes);
  } catch (e) {
    next(e);
  }
};

exports.deleteNote = async (req, res, next) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ error: "Not found" });
    if (note.uploadedBy.toString() !== req.user.id)
      return res.status(403).json({ error: "Not allowed" });

    const full = path.join(process.cwd(), note.fileUrl);
    if (fs.existsSync(full)) fs.unlinkSync(full);

    await note.deleteOne();
    res.json({ message: "Deleted" });
  } catch (e) {
    next(e);
  }
};
