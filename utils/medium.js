const utils = require("./utils");
const { parse } = require("rss-to-json");

const compileFrontMatter = (story) => {
  const publishDate = new Date(story.date).toJSON();
  const author = { name: story.author };
  if (story.author === "Jessie Penaloza") {
    author.title = "Digital Marketing Coordinator";
    author.image = "/img/contributors/jesus-penaloza_88-88.jpg";
  } else if (story.author === "Chris Stegall") {
    author.title = "Marketing Director";
    author.image = "/img/contributors/chris-stegall_352x352.jpg";
  }
  const tagArray = JSON.stringify(story.tags);
  const f = `---
{
  "priority":"0.5",
  "haveYoutube": false,
  "haveGithubGist": false,
  "haveTwitter": false,
  "date": "${publishDate}",
  "title": "${story.title}",
  "Slug": "${story.slug}",
  "description": "${story.description}.",
  "tags": ${tagArray},
  "author": {
    "name": ${author.name},
    "title": ${author.title},
    "jpeg": ${author.image}
  },
  "layout": "single",
  "thumbnail": {
    "url": "/img/${story.thumbnailURL}"
  }
}
---`;
  return f;
};

const getContentAfterFirstFigure = (content) => {
  if (
    content &&
    content.indexOf("<figure>") >= 0 &&
    content.indexOf("</figure>") > content.indexOf("<figure>")
  ) {
    content = content.substring(content.indexOf("</figure>") + 9);
  }
  return content;
};

const scrapeFromRSS = async () => {
  const PREVIOUS_POSTS_BODY = await utils.readFile("posts.json");
  let previousPostMap = JSON.parse(PREVIOUS_POSTS_BODY);
  const ENDPOINT = "https://medium.com/feed/creme-de-la-crm";
  // const ENDPOINT =
  //   "https://medium.com/feed/creme-de-la-crm/tagged/salesforce integration";
  // let res = await utils.callOut({method:"get", url:ENDPOINT});
  const DATA = await parse(ENDPOINT);
  // console.log("DATA",DATA);
  // console.log(previousPostMap);
  const newPostArray = [];
  if (DATA.items && DATA.items.length > 0) {
    const toDownload = [];
    for (let i = 0; i < DATA.items.length; i++) {
      const mediumLink = DATA.items[i].link;
      if (!previousPostMap[mediumLink]) {
        const story = convertRssItem(DATA.items[i]);
        newPostArray.push(story.localFileName + ".md");
        toDownload.push(
          utils.saveFile(story.localFileName + ".md", story.mdContent)
        );
        if (story.mediumImagesToDownload) {
          for (let i = 0; i < story.mediumImagesToDownload.length; i++) {
            const mediumImageUrl = story.mediumImagesToDownload[i];
            const ourImageUrl =
              "/img/" +
              utils.cleanFileName(
                utils.substringafterlast(mediumImageUrl, "/")
              );
            toDownload.push(
              utils.downloadImage(mediumImageUrl, "../" + ourImageUrl)
            );
          }
        }
        previousPostMap[mediumLink] = new Date().toJSON();
      } else {
        break;
      }
    }
    if (toDownload.length > 0) {
      await Promise.all(toDownload);
    }
  }
  previousPostMap = JSON.stringify(previousPostMap);
  previousPostMap = previousPostMap.replace(/,/g, ",\n");
  console.log(previousPostMap);
  await utils.saveFile("./posts.json", previousPostMap);
  return newPostArray;
};

const replaceHTMLTag = (body, tag, markdownOpen = "", markdownClose = "") => {
  const reg = new RegExp("<" + tag + "(.*?)</" + tag + ">", "gmi");
  const tags = body.match(reg);
  if (tags && tags.length > 0) {
    for (let i = 0; i < tags.length; i++) {
      const newTag = utils.substringbetween(tags[i], ">", "<");
      body = body.replace(tags[i], markdownOpen + newTag + markdownClose);
    }
  }
  return body;
};

const convertRssItem = (item) => {
  let link = item.link;
  if (link.includes("?")) {
    link = link.substring(0, link.indexOf("?"));
  }
  const fileName = link.replace("https://medium.com/creme-de-la-crm/", "");
  const story = {};
  story.author = item.author;
  story.cremeUrl = "https://cremedelacrm.com/post/" + fileName;
  story.slug = utils.substringbeforelast(fileName, "-");
  story.localFileName = "content/post/" + story.slug;
  story.title = item.title;
  story.date = new Date(item.published);
  story.tags = item.category;
  story.rssContent = getContentAfterFirstFigure(item.content);
  const imgRex = /https:\/\/cdn-images-1.medium.com\/([^"]*.")/gim;
  const rawImages = item.content.match(imgRex);
  story.mediumImagesToDownload = [];
  if (rawImages && rawImages.length > 0) {
    for (let i = 0; i < rawImages.length; i++) {
      const src = rawImages[i].replace(/"/, "").replace("'", "");
      story.mediumImagesToDownload.push(src);
    }
  }
  story.thumbnailURL = utils.substringafter(
    utils.cleanFileName(story.mediumImagesToDownload[0]),
    ".com/"
  );
  story.thumbnailURL = story.thumbnailURL.substring(
    0,
    story.thumbnailURL.length
  );
  story.mdContent = story.rssContent.replace(/\n/, "");

  if (item.content.indexOf("<h4>") === 0) {
    story.description = utils.substringbetween(item.content, "<h4>", "</h4>");
  } else if (
    story.mdContent.indexOf("<p>") >= 0 &&
    story.mdContent.indexOf("<p>") < 5
  ) {
    story.description = utils.substringbetween(story.mdContent, "<p>", "</p>");
  } else if (
    story.mdContent.indexOf("<h4>") > 0 &&
    story.mdContent.indexOf("<h4>") < 5
  ) {
    story.description = utils.substringbetween(
      story.mdContent,
      "<h4>",
      "</h4>"
    );
  }
  story.description = story.description.replace(/<[^>]*>/gim, "");

  const figureRegex = /<figure>(.*?)<\/figure>/gim;
  const figureTags = story.mdContent.match(figureRegex);
  if (figureTags && figureTags.length > 0) {
    for (let i = 0; i < figureTags.length; i++) {
      const oldTag = figureTags[i];
      let src = utils.cleanFileName(
        utils.substringbetween(oldTag, 'src="', '"')
      );
      src = src.replace("https://cdn_images_1.medium.com", "/img");
      src = src.replace(/\/max\/(?:\D*\d){3}\//gim, "/");
      const newTag = '{{< image src="' + src + '" title="Image" >}}';
      story.mdContent = story.mdContent.replace(oldTag, newTag + "\n\n");
    }
  }

  const pRegex = /<p>(.*?)<\/p>/gim;
  const pTags = story.mdContent.match(pRegex);
  if (pTags && pTags.length > 0) {
    for (let i = 0; i < pTags.length; i++) {
      const newTag = pTags[i].replace("<p>", "").replace("</p>", "\n");
      story.mdContent = story.mdContent.replace(pTags[i], newTag);
    }
  }

  const aRegex = /<a(.*?)<\/a>/gim;
  const aTags = story.mdContent.match(aRegex);
  if (aTags && aTags.length > 0) {
    for (let i = 0; i < aTags.length; i++) {
      const a = utils.parseATag(aTags[i]);
      const newTag = "[" + a.innerHTML + "](" + a.href + ")";
      story.mdContent = story.mdContent.replace(aTags[i], newTag);
    }
  }

  story.mdContent = replaceHTMLTag(story.mdContent, "h4", "\n## ", "\n\n");
  console.log("mdContent", story.mdContent);

  story.mdContent = replaceHTMLTag(story.mdContent, "h3", "\n## ", "\n\n");
  story.mdContent = replaceHTMLTag(story.mdContent, "em", "**", "**");

  const blockquoteRegex = /<blockquote(.*?)<\/blockquote>/gim;
  const blockquoteTags = story.mdContent.match(blockquoteRegex);
  if (blockquoteTags && blockquoteTags.length > 0) {
    for (let i = 0; i < blockquoteTags.length; i++) {
      let newTag = utils.substringbetween(
        blockquoteTags[i],
        "<blockquote>",
        "</blockquote"
      );
      newTag = newTag.replace(/<br>/gim, "  \n>");
      story.mdContent = story.mdContent.replace(
        blockquoteTags[i],
        "\n> " + newTag + "\n"
      );
    }
  }
  if (story.mdContent.indexOf(story.thumbnailURL) > 0) {
    story.mdContent = utils.substringafter(story.mdContent, story.thumbnailURL);
    story.mdContent = utils.substringafter(
      story.mdContent,
      'title="Image" >}}'
    );
  }
  story.mdContent = compileFrontMatter(story) + "\n" + story.mdContent;
  if (story.mdContent.indexOf('<img src="https://medium.com/_/stat') > 0) {
    story.mdContent = utils.substringbefore(
      story.mdContent,
      '<img src="https://medium.com/_/stat'
    );
  }
  return story;
};

exports.scrapeMedium = () => {
  return scrapeFromRSS();
};
