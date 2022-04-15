const { sendJsonResponse } = require('../common/renderer');
const axios = require('axios');
const itemModel = require('../models/item');
const {
  searchHelper,
  projectHelper,
  sortHelper,
  facetHelper,
} = require('../common/helper');

exports.addJsonData = async (req, res) => {
  try {
    const apiEndpoint = `https://www.toptal.com/developers/feed2json/convert?url=https://www.toptal.com/blog.rss`;
    console.log('apiEndpoint :::: ', apiEndpoint);
    let jsondata = await axios.get(apiEndpoint);
    const { data } = jsondata;

    if (data.items.length > 0) {
      const items = data.items;
      await Promise.all(
        items.map(async (item) => {
          const { guid, title } = item;
          const itemData = await itemModel.find({ guid, title });
          if (itemData.length === 0) {
            await itemModel(item).save();
          }
        })
      );
    }

    return {};
  } catch (error) {
    console.log('error :: ', error);
    sendJsonResponse(req, res, 400, {}, true, error.message);
  }
};

exports.searchKeyword = async (req, res) => {
  try {
    const {
      body: { term, limit, skip },
    } = req;

    const pipeline = [];
    if (term)
      pipeline.push(
        searchHelper(term, [
          'guid',
          'title',
          'url',
          'content_html',
          'date_published',
          'summary',
        ])
      );
    pipeline.push(
      projectHelper(
        ['guid', 'title', 'url', 'content_html', 'date_published', 'summary'],
        1
      )
    );
    pipeline.push(sortHelper('title', 'asc'));
    pipeline.push(facetHelper(skip || 0, limit || 20));

    const search = await itemModel.aggregate(pipeline);

    sendJsonResponse(
      req,
      res,
      200,
      search,
      true,
      'Keyword searched successfully'
    );
  } catch (error) {
    console.log('error :: ', error);
    sendJsonResponse(req, res, 400, {}, true, error.message);
  }
};
