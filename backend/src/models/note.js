const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    subject: { type: String, required: true },
    tags: [String],
    visibility: { type: String, enum: ["public", "class"], default: "public" },
    fileUrl: { type: String, required: true }, // /uploads/<file>
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    class: { type: mongoose.Schema.Types.ObjectId, ref: "Class" }, // optional
  },
  { timestamps: true }
);

module.exports = mongoose.model("Note", noteSchema);
