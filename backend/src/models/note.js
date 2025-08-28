const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    title: { type: String, default: "New Note" },
    tags: { type: [String], default: [] },
    contentHTML: { type: String, default: "" },
    contentJSON: { type: Object, default: null }, // optional (if you later store editor JSON)
    templateVersion: { type: String, default: "v1" },
    theme: { type: String, enum: ["auto", "light", "dark"], default: "auto" },
  },
  { timestamps: true }
);

// module.exports = mongoose.model('Note', NoteSchema);

// const mongoose = require("mongoose");

// const NoteSchema = new mongoose.Schema(
//   {
//     userId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//       index: true,
//     },
//     title: { type: String, default: "New Note" },
//     tags: { type: [String], default: [] },
//     contentHTML: { type: String, default: "" },
//     contentJSON: { type: Object, default: null }, // optional (if you later store editor JSON)
//     templateVersion: { type: String, default: "v1" },
//     theme: { type: String, enum: ["auto", "light", "dark"], default: "auto" },
//   },
//   { timestamps: true }
// );

module.exports = mongoose.model("Note", NoteSchema);
