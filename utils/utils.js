const fs = require('node:fs')
const axios = require('axios')
const path = require("path")

exports.callOut = async (req) => {
  if (req.method === 'post'){
    return await axios.post( req.url, req.data, req.headers )
  }
  else if ( req.method === 'get' ){
    let options = {};
    if ( req.params ){
      options.params = req.params;
    }
    if ( req.headers ){
      options.headers = req.headers
    }
    return await axios.get( req.url, options);
  }
}

exports.cleanFileName = (fileName) => {
  return fileName.replace('max/1024/','').replace(/\*/g,'_').replace(/-/g,'_');
}

exports.downloadImage = async (url, fileName) =>{
  const dir = path.resolve(__dirname, "../assets/img/", fileName);
  console.log(url, dir);
  await axios({
    method: "get",
    url: url,
    responseType: "stream"
  }).then(res => {
    res.data.pipe(fs.createWriteStream(dir));
    res.data.on("end", () => {
      console.log("download complete");
    });
  });
}

exports.saveFile = async (fileName, fileContent) => {
  console.log(fileName);
  fs.writeFile(fileName, fileContent, err => {
    if (err) {
      console.error(err);
      console.error("saveFile error");
    }
  });
}

exports.readFile = async (fileName) => {
  return fs.readFileSync(fileName);
}

/**
 * @name substringafter
 * @returns the text after the first
 */
exports.substringafter = (txt, after) => {
  let result;
  if (typeof txt === 'string' && typeof after === 'string') {
    let afterIndex = txt.indexOf(after) + after.length;
    let _txt = txt.substring(afterIndex);
    result = _txt;
  }
  return result;
};

/**
 * @name substringafterlast
 * @returns the text after the last
 */
exports.substringafterlast = (txt, after) => {
  let result;
  if (typeof txt === 'string' && typeof after === 'string') {
    let afterIndex = txt.lastIndexOf(after) + after.length;
    let _txt = txt.substring(afterIndex);
    result = _txt;
  }
  return result;
};

/**
 * @name substringbefore
 * @returns the text before the first
 */
exports.substringbefore = (txt, before) => {
  let result;
  if (typeof txt === 'string' && typeof before === 'string') {
    let beforeIndex = txt.indexOf(before);
    let _txt = txt.substring(0, beforeIndex);
    result = _txt;
  }
  return result;
};

/**
 * @name substringbeforelast
 * @returns the text before the last
 */
exports.substringbeforelast = (txt, before) => {
  let result;
  if (typeof txt === 'string' && typeof before === 'string') {
    let beforeIndex = txt.lastIndexOf(before);
    let _txt = txt.substring(0, beforeIndex);
    result = _txt;
  }
  return result;
};

/**
 * @name substringbetween
 * @returns the text between
 */
exports.substringbetween = (txt, after, before) => {
  let result;
  if (
    typeof txt === 'string' &&
    typeof before === 'string' &&
    typeof after === 'string'
  ) {
    let _txt = this.substringafter(txt, after);
    _txt = this.substringbefore(_txt, before);
    result = _txt;
  }
  return result;
};

/**
 * @name substringbetweenfirstandlast
 * @returns the text between the first and last
 */
exports.substringbetweenfirstandlast = (txt, after, before) => {
  let result;
  if (
    typeof txt === 'string' &&
    typeof before === 'string' &&
    typeof after === 'string'
  ) {
    let _txt = this.substringafter(txt, after);
    _txt = this.substringbeforelast(_txt, before);
    result = _txt;
  }
  return result;
};

//      //<a href="https://www.salesforce.com/products/sales-pricing/">Sales Cloud</a>

exports.parseATag = (tag) =>{
  const res = {};
  if ( tag.indexOf('href="') > 0 ){
    res.href = this.substringbetween(tag,'href="','"');
  }
  else if ( tag.indexOf("href='") > 0 ){
    res.href = this.substringbetween(tag,"href='","'");
  }
  res.innerHTML = this.substringbetween(tag,'>','<');
  return res;
}