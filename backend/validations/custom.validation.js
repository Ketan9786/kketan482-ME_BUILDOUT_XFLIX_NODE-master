const genreList = ["Education", "Sports", "Comedy", "Lifestyle","All"];
const contentRatingList = ["7+", "12+", "16+", "18+","Anyone","All"];
const voteList = ["upVote", "downVote"];
const changeList = ["increase", "decrease"];
const sortByList = ["viewCount", "releaseDate"];

const objectId = (value, helpers) => {
    if (!value.match(/^[0-9a-fA-F]{24}$/)) {
      return helpers.message('"{{#label}}" must be a valid mongo id');
    }
    return value;
  };

const genre = (value, helpers) => {
    if (value.indexOf(",") > -1) {
        let valueList = value.split(",");
 
        for (let i = 0; i < valueList.length; i++) {
            if (!genreList.includes(valueList[i]))
            {
                return helpers.message('"{{#label}}" must be one of [Education, Sports, Movies, Comedy, Lifestyle, All]');
            }
        }
    }
    else if(!genreList.includes(value))
    {
        return helpers.message('"{{#label}}" must be one of [Education, Sports, Movies, Comedy, Lifestyle, All]');
    }
    return value;
  };
  
  const contentRating = (value, helpers) => {
    if(!contentRatingList.includes(value))
    {
        return helpers.message('"{{#label}}" must be one of [Anyone, 7+, 12+, 16+, 18+, All]');
    }
    return value;
  };
  
  const vote = (value, helpers) => {
    if(!voteList.includes(value))
    {
        return helpers.message('"{{#label}}" must be one of ["upVote", "downVote"]');
    }
    return value;
  };

  const change = (value, helpers) => {
    if(!changeList.includes(value))
    {
        return helpers.message('"{{#label}}" must be one of  ["increase", "decrease"]');
    }
    return value;
  };

  const sortBy = (value, helpers) => {
    if(!sortByList.includes(value))
    {
        return helpers.message('"{{#label}}" must be one of  ["viewCount", "releaseDate"]');
    }
    return value;
  };

  module.exports = {
    objectId,
    genre,
    contentRating,
    vote,
    change,
    sortBy
  };