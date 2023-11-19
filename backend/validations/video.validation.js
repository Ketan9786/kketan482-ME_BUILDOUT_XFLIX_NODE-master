const Joi = require("joi");
const {
  objectId,
  genre,
  contentRating,
  vote,
  change,
  sortBy,
} = require("./custom.validation");

const getVideos = {
  query: Joi.object().keys({
    sortBy: Joi.string().custom(sortBy),
    title:Joi.string(),
    genres: Joi.string().custom(genre),
    contentRating: Joi.string().custom(contentRating),
  }),
};

const getVideoById = {
  params: Joi.object().keys({
    videoId: Joi.string().custom(objectId),
  }),
};

const createVideo = {
  body: Joi.object().keys({
    videoLink: Joi.string(),
    genre: Joi.string().custom(genre),
    contentRating: Joi.string().custom(contentRating),
    title: Joi.string(),
    releaseDate: Joi.string(),
    previewImage: Joi.string(),
  }),
};

const updateVideo = {
  params: Joi.object().keys({
    videoId: Joi.string().custom(objectId),
  }),
  body: Joi.object().keys({
    vote: Joi.string(),
    change: Joi.string(),
  }),
};

const updateViews = {
  params: Joi.object().keys({
    videoId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  getVideos,
  getVideoById,
  createVideo,
  updateVideo,
  updateViews,
};