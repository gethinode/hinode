const utils = require("./utils");
// const html2md = require('html-to-md');
// const MEDIUM_IMG_CDN = 'https://miro.medium.com/v2/'

const compileFrontMatter = (story) => {
  const publishDate = new Date(story.date).toJSON();
  const author = { name: story.author };
  if (story.author === "Jessie Penaloza") {
    author.title = "Digital Marketing Coordinator";
    author.image = ""/img/contributors/jesus-penaloza_88-88.jpg"";
  } else if (story.author === "Chris Stegall") {
    author.title = "Marketing Director";
    author.image = "/img/contributors/chris-stegall_128-128.jpeg";
  }
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
  "tags": ${story.tags},
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
    content.indexOf("<figure>") === 0 &&
    content.indexOf("</figure>") > 0
  ) {
    content = content.substring(content.indexOf("</figure>") + 9);
  }
  return content;
};

const scrapeMedium = async () => {
  const previousPostsBody = await utils.readFile("posts.json");
  const previousPostMap = JSON.parse(previousPostsBody);
  const endpoint =
    "https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fmedium.com%2Ffeed%2Fcreme-de-la-crm";
  const res = await utils.callOut({ method: "get", url: endpoint });
  const data = res.data;
  console.log(previousPostMap);
  if (data.items && data.items.length > 0) {
    const toDownload = [];
    for (let i = 0; i < data.items.length; i++) {
      const mediumLink = data.items[i].link;
      console.log(mediumLink);
      if (!previousPostMap[mediumLink]) {
        const story = convertRssItem(data.items[i]);
        toDownload.push(
          utils.saveFile(story.localFileName + ".md", story.mdContent)
        );
        if (story.mediumImagesToDownload) {
          for (let i = 0; i < story.mediumImagesToDownload.length; i++) {
            const mediumImageUrl = story.mediumImagesToDownload[i];
            console.log(mediumImageUrl);
            const ourImageUrl =
              "/img/" +
              utils.cleanFileName(
                utils.substringafterlast(mediumImageUrl, "/")
              );
            toDownload.push(utils.downloadImage(mediumImageUrl, ourImageUrl));
          }
        }
        previousPostMap[mediumLink] = "scraped";
      } else {
        break;
      }
    }
    if (toDownload.length > 0) {
      await Promise.all(toDownload);
    }
  }
  await utils.saveFile("./posts.json", JSON.stringify(previousPostMap));
};

const convertRssItem = (item) => {
  let link = item.link;
  if (link.includes("?")) {
    link = link.substring(0, link.indexOf("?"));
  }
  fileName = link.replace("https://medium.com/creme-de-la-crm/", "");
  const story = {};
  story.author = item.author;
  story.cremeUrl = "https://cremedelacrm.com/post/" + fileName;
  story.slug = utils.substringbeforelast(fileName, "-");
  story.localFileName = "content/post/" + fileName;
  story.title = item.title;
  story.date = new Date(item.pubDate);
  story.tags = item.categories;
  story.rssContent = getContentAfterFirstFigure(item.content);
  const imgRex = /https:\/\/cdn-images-1.medium.com\/([^"]*.")/gim;
  const rawImages = story.rssContent.match(imgRex);
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
    story.thumbnailURL.length - 1
  );
  story.mdContent = story.rssContent.replace(/\n/, "");
  if (story.mdContent.indexOf("<figure>") === 0) {
    // Remove thumbnail
    story.mdContent = utils.substringafter(story.mdContent, "</figure>");
  }
  console.log(story.mdContent);

  if (
    story.mdContent.indexOf("<p>") >= 0 &&
    story.mdContent.indexOf("<p>") < 5
  ) {
    story.description = utils.substringbetween(story.mdContent, "<p>", "</p>");
    // Get Description
    // story.mdContent = utils.substringafter(story.mdContent,'</p>');
  }

  const figureRegex = /<figure>(.*)<\/figure>/gim;
  const figureTags = story.mdContent.match(figureRegex);
  if (figureTags && figureTags.length > 0) {
    for (let i = 0; i < figureTags.length; i++) {
      const oldTag = figureTags[i];
      let src = utils.cleanFileName(
        utils.substringbetween(oldTag, 'src="', '"')
      );
      src = src.replace("https://cdn_images_1.medium.com", "/img");
      const newTag = '{{< image src="' + src + '" title="Image" >}}';
      story.mdContent = story.mdContent.replace(oldTag, newTag + "\n\n");
    }
  }

  const pRegex = /<p>(.*)<\/p>/gim;
  const pTags = story.mdContent.match(pRegex);
  if (pTags && pTags.length > 0) {
    for (let i = 0; i < pTags.length; i++) {
      const newTag = pTags[i].replace("<p>", "").replace("</p>", "\n");
      story.mdContent = story.mdContent.replace(pTags[i], newTag);
    }
  }

  const aRegex = /<a(.*)<\/a>/gim;
  const aTags = story.mdContent.match(aRegex);
  if (aTags && aTags.length > 0) {
    for (let i = 0; i < aTags.length; i++) {
      const a = utils.parseATag(aTags[i]);
      const newTag = "[" + a.innerHTML + "](" + a.href + ")";
      story.mdContent = story.mdContent.replace(aTags[i], newTag);
    }
  }

  const h3Regex = /<h3(.*)<\/h3>/gim;
  const h3Tags = story.mdContent.match(h3Regex);
  if (h3Tags && h3Tags.length > 0) {
    for (let i = 0; i < h3Tags.length; i++) {
      const newTag = utils.substringbetween(h3Tags[i], ">", "<");
      story.mdContent = story.mdContent.replace(
        h3Tags[i],
        "\n## " + newTag + "\n"
      );
    }
  }

  const blockquoteRegex = /<blockquote(.*)<\/blockquote>/gim;
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

  story.mdContent = compileFrontMatter(story) + "\n\n\n" + story.mdContent;
  if (story.mdContent.indexOf('<img src="https://medium.com/_/stat') > 0) {
    story.mdContent = utils.substringbefore(
      story.mdContent,
      '<img src="https://medium.com/_/stat'
    );
  }
  return story;
};

scrapeMedium();
