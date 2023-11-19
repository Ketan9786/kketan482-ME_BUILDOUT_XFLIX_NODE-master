const express = require("express");
const validate = require("../middlewares/validate");
const videoValidation = require("../validations/video.validation");
const { videoController } = require("../controllers");

const router = express.Router();

router.get(
  "/",
  validate(videoValidation.getVideos),
  videoController.getVideos
);
router.get(
  "/:videoId",
  validate(videoValidation.getVideoById),
  videoController.getVideosbyId
);
router.post(
  "/",
  validate(videoValidation.createVideo),
  videoController.createVideo
);
router.patch(
  "/:videoId/votes",
  validate(videoValidation.updateVideo),
  videoController.updateVotes
);

router.patch(
  "/:videoId/views",
  validate(videoValidation.updateViews),
  videoController.updateViews
);

module.exports = router;