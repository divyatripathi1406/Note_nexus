const Class = require("../models/Class");
const generateCode = require("../utils/generateCode");

exports.createClass = async (req, res, next) => {
  try {
    const { name, subject } = req.body;
    const code = generateCode();
    const klass = await Class.create({
      name,
      subject,
      code,
      owner: req.user.id,
      members: [req.user.id],
    });
    res.status(201).json(klass);
  } catch (e) {
    next(e);
  }
};

exports.joinClass = async (req, res, next) => {
  try {
    const { code } = req.body;
    const klass = await Class.findOne({ code });
    if (!klass) return res.status(404).json({ error: "Class not found" });

    if (!klass.members.some((m) => m.toString() === req.user.id)) {
      klass.members.push(req.user.id);
      await klass.save();
    }
    res.json(klass);
  } catch (e) {
    next(e);
  }
};

exports.myClasses = async (req, res, next) => {
  try {
    const classes = await Class.find({
      $or: [{ owner: req.user.id }, { members: req.user.id }],
    }).sort({ createdAt: -1 });
    res.json(classes);
  } catch (e) {
    next(e);
  }
};

exports.getOne = async (req, res, next) => {
  try {
    const klass = await Class.findById(req.params.id)
      .populate("owner", "name email")
      .populate("members", "name email");
    if (!klass) return res.status(404).json({ error: "Not found" });
    res.json(klass);
  } catch (e) {
    next(e);
  }
};
