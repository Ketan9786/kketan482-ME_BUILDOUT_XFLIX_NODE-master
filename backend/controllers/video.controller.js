// const data = require("../../data.json");
// const genreList = ["Education", "Sports", "Comedy", "Lifestyle"];
// const contentRating = ["7+", "12+", "16+", "18+"];
const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const { videoService } = require("../services");
// const { userService } = require("../services");
// throw new ApiError(httpStatus.BAD_REQUEST, "Bad request");

function parseDate(s) {
  let months = {
    jan: 0,
    feb: 1,
    mar: 2,
    apr: 3,
    may: 4,
    jun: 5,
    jul: 6,
    aug: 7,
    sep: 8,
    oct: 9,
    nov: 10,
    dec: 11,
  };
  let p = s.split(" ");
  return new Date(p[2], months[p[1].toLowerCase()], p[0]);
}

function isWordPresent(sentence, word) {

  // word = transform(word);
  // sentence = transform(sentence);
  var re = new RegExp(word, 'gi');
  let res =  sentence.match(re);
  if(res)
  return true
  else
  return false
  // let s = sentence.split(" ");

  // for (let temp = 0; temp < s.length; temp++) {
  //   if (s[temp] == word) {
  //     return true;
  //   }
  // }
  // return false;
}

function transform(word) {
  return word.toUpperCase();
}

const outputJsonFormat = (results) => {
  
  let formattedResult = [];
  for (let i = 0; i < results.length; i++) {
    let obj = {
      votes: {
        upVotes: Number(results[i].votes.upVotes),
        downVotes: Number(results[i].votes.downVotes),
      },
      previewImage: results[i].previewImage,
      viewCount: Number(results[i].viewCount),
      _id: results[i]._id,
      videoLink: results[i].videoLink,
      title: results[i].title,
      genre: results[i].genre,
      contentRating: results[i].contentRating,
      releaseDate: results[i].releaseDate,
    };
    formattedResult.push(obj);
  }
  
  return { videos: formattedResult };
};
const filterByGenre = (videoList, genres) => {
  let results;
  if (genres.indexOf(",") > -1) {
    let genresArray = genres.split(",");
    for (let i = 0; i < genresArray.length; i++) {
      if (genresArray[i] === "All") {
        results = videoList;
        break;
      }
      results = {
        videos: videoList.videos.filter((item) => genres.includes(item.genre)),
      };
    }
  } else if (genres === "All") {
    results = videoList;
  } else {
    results = {
      videos: videoList.videos.filter((item) => item.genre === genres),
    };
  }
  // console.log(results);
  return (results);
};

const filterByContentRating = (videoList, contentRating) => {
  let results;
  switch (contentRating) {
    case "7+":
      results = {
 
        videos: videoList.videos.filter(
          (item) =>
            item.contentRating === contentRating ||
            item.contentRating === "Anyone"
        ),
      };
      break;
    case "12+":
      results = {
        videos: videoList.videos.filter(
          (item) =>
            // item.contentRating === "7+" ||
            item.contentRating === contentRating ||
            item.contentRating === "Anyone"
        ),
      };
      break;
    case "16+":
      results = {
        videos: videoList.videos.filter(
          (item) =>
            // item.contentRating === "12+" ||
            // item.contentRating === "7+" ||
            item.contentRating === contentRating ||
            item.contentRating === "Anyone"
        ),
      };
      break;
    case "18+":
      results = {
        videos: videoList.videos.filter(
          (item) =>
            // item.contentRating === "16+" ||
            // item.contentRating === "12+" ||
            // item.contentRating === "7+" ||
            item.contentRating === contentRating ||
            item.contentRating === "Anyone"
        ),
      };
      break;
  }
  return results;
};
const getVideos = catchAsync(async(req, res) => {
  const { title, genres, contentRating, sortBy } = req.query;
  const videos = await videoService.getAllVideos();
  if(videos)
  {if (!title && !genres && !contentRating && !sortBy) {
    res.status(200).send(outputJsonFormat(videos));
  } else if (sortBy) {
    switch (sortBy) {
      case "releaseDate":
        videos.sort(function (a, b) {
          return parseDate(b.releaseDate) - parseDate(a.releaseDate);
        });
        break;
      case "viewCount":
       videos.sort((a, b) => b.viewCount - a.viewCount);
        break;
    }
    res.status(200).send(outputJsonFormat(videos));
  } else {
    
    let results = outputJsonFormat(videos);
    if (title) {
      // results.videos.filter((item) => console.log(item.title,title,isWordPresent(item.title, title)))
      results = {
        videos: results.videos.filter((item) => isWordPresent(item.title, title)),
      };
    }
    if (genres) {
      if (title) results = filterByGenre(results, genres);
      else results = filterByGenre(results, genres);
    }
    if (contentRating) {
      if (genres || title)
        results = filterByContentRating(results, contentRating);
      else results = filterByContentRating(results, contentRating);
    }

    res.status(200).send(results);
  }}
  else
  throw new ApiError(httpStatus.BAD_REQUEST, "Bad request");
});

const getVideosbyId = catchAsync(async (req, res) => {
  try {
    const video = await videoService.getVideoById(req.params.videoId);
    if (video) res.status(201).json(video);
    else throw new ApiError(httpStatus.BAD_REQUEST, "Bad request");
    return video;
  } catch (error) {
    throw error;
  }

});

const createVideo = catchAsync(async (req, res) => {
  try {
    const video = await videoService.createVideo(req.body);
    if (video) res.status(201).json(video);
    else throw new ApiError(httpStatus.BAD_REQUEST, "Bad request");

    return video;
  } catch (error) {
    throw error;
  }
});

const updateVotes = catchAsync(async (req, res) => {

    const videoById = await videoService.updateVideoVote(
      req.params.videoId,
      req.body.vote,
      req.body.change
    );
    if (videoById) res.sendStatus(204);
    else throw new ApiError(httpStatus.BAD_REQUEST, "Bad request");

});

const updateViews = catchAsync(async (req, res) => {
 
    const videoById = await videoService.updateVideoViews(req.params.videoId);
    if (videoById) res.sendStatus(204);
    else throw new ApiError(httpStatus.BAD_REQUEST, "Bad request");
});

module.exports = {
  getVideos,
  getVideosbyId,
  createVideo,
  updateVotes,
  updateViews,
};