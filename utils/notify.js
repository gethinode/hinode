const utils = require('./utils');

/**
 * @description Notifies IndexNow.org about the new posts
 * @param {*} newUrlArray 
 */
 const notifyIndexNow = async (newUrlArray) => {
  const key = '7747a3dd42604a608b2eed9eaf8934f3';
  const req = {
    method: 'post',
    url: 'https://api.indexnow.org',
    headers: {
      'Accept': 'application/json; charset=utf-8',
      'Content-Type': 'application/json; charset=utf-8'
    },
    data: {
      "host": "www.cremedelacrm.com",
      "key": key,
      "keyLocation": "https://www.cremedelacrm.com/"+key+".txt",
      "urlList": newUrlArray
    }
  };
  const res = await utils.callOut(req);
  console.log(res.status);
  console.log(res.statusText);
}

// https://developers.google.com/search/apis/indexing-api/v3/quickstart
const notifyGoogle = async (newUrlArray) => {
  let toCallOut = [];
  for ( let i=0; i<newUrlArray.length; i++ ){
    const req = {
      method: 'post',
      url: 'https://indexing.googleapis.com/v3/urlNotifications:publish',
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        url: newUrlArray[i],
        type: 'URL_UPDATED'
      }
    };
    toCallOut.push( utils.callOut(req) );
  }
  let results = await Promise.all(toCallout);
}

let urlArray = ['https://cremedelacrm.com/post/5-things-we-love-about-tdx-a-valentines-day-tribute-to-trailblazers/'];
notifyIndexNow(urlArray);