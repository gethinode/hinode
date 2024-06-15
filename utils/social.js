const { TwitterApi } = require('twitter-api-v2');

const latestPost = {
  title: '',
  description: '',
  media: []
};

const client = new TwitterApi({
  appKey: 'consumerAppKey',
  appSecret: 'consumerAppSecret',
  // Following access tokens are not required if you are
  // at part 1 of user-auth process (ask for a request token)
  // or if you want a app-only client (see below)
  accessToken: 'accessOAuthToken',
  accessSecret: 'accessOAuthSecret',
});

const rwClient = client.readWrite;

let uploads = [];
for ( let i=0; i<latestPost.media.length; i++ ){
  uploads.push( client.v1.uploadMedia(latestPost.media[i].path) );
}
// First, post all your images to Twitter
const mediaIds = await Promise.all(uploads);

// mediaIds is a string[], can be given to .tweet
await client.v2.tweet({
  text: 'My tweet text with two images!',
  media: { media_ids: mediaIds }
});