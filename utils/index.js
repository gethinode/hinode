const medium = require('./medium')
const utils = require('./utils')

const getLatestPosts = async () => {
  let newPostsArray = await medium.scrapeMedium()
  console.log(newPostsArray)
  // await notifyIndexNow(newPostsArray)
}

getLatestPosts()
