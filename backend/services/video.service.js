const { Video } = require("../models");
const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");

const getAllVideos = async() => {
  const getAllVideos = await Video.find({}); 
  return getAllVideos
}

const getVideoById = async(id) => {
  const videoById = await Video.findOne({ _id: id }); 
  return videoById
}
const updateVideoVote = async (id,vote,change) => {
  const videoById = await getVideoById(id)
  if(videoById)
  { 
    if(vote==="upVote")
    { if(change==="increase")
      videoById.votes.upVotes += 1;
      if(change==="decrease")
      videoById.votes.upVotes -= 1;
    }
    if(vote==="downVote")
    { if(change==="increase")
      videoById.votes.downVotes += 1;
      if(change==="decrease")
      videoById.votes.downVotes -= 1;
    }
    const res = await videoById.save();
    if(res)
    return videoById;
    else
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "internal error");
  }
  else
  throw new ApiError(httpStatus.NOT_FOUND, "video not found");
};

const updateVideoViews = async(id) => {
  const videoById = await getVideoById(id);
  if(videoById)
  {
    videoById.viewCount += 1;
    const res = await videoById.save();
    if(res)
    return videoById;
    else
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "internal error");
  }
  else
  throw new ApiError(httpStatus.NOT_FOUND, "video not found");
}
const createVideo = async (videoBody) => {
  const res = await Video.create({
    ...videoBody,
    votes: {
      upVotes: 0,
      downVotes: 0,
    },
  });
  return res;
};

module.exports = { getAllVideos, createVideo, getVideoById, updateVideoVote, updateVideoViews };