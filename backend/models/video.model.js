const mongoose = require("mongoose");

const videoSchema = mongoose.Schema(
  {
    videoLink: {
      type: String,
      required: true,
      trim: true,
      required: "videoLink can't be empty",
      unique: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    genre: {
      type: String,
      required: true,
    },
    contentRating: {
      type: String,
      required: true,
    },
    releaseDate: {
      type: String,
      required: true,
    },
    previewImage: {
      type: String,
      required: true,
      trim: true,
    },
    votes: {
      upVotes: {
        type: Number,
        default: 0,
      },
      downVotes: {
        type: Number,
        default: 0,
      },
    },
    viewCount: {
      type: Number,
      default: 0,
    },
  }
);

const Video = mongoose.model("videos", videoSchema);

module.exports = { Video };