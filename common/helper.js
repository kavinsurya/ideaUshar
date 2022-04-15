module.exports = {
  facetHelper: (skip, limit) => {
    return {
      $facet: {
        list: [
          {
            $skip: Number(skip) < 0 ? 0 : Number(skip) || 0,
          },
          {
            $limit: Number(limit) < 0 ? 20 : Number(limit) || 20,
          },
        ],
        totalRecords: [
          {
            $count: 'count' || 0,
          },
        ],
      },
    };
  },
  searchHelper: (searchFiled, fields) => {
    const orArr = [];
    const search = searchFiled.split(' ');
    fields.forEach((element1) => {
      search.forEach((element) => {
        orArr.push({ [element1]: { $regex: new RegExp(element, 'i') } });
      });
    });
    return { $match: { $or: orArr } };
  },

  projectHelper: (fields, type) => {
    const projectArr = {};
    fields.forEach((element) => {
      projectArr[element] = type;
    });
    return { $project: projectArr };
  },
  sortHelper: (columnName, orderBy) => {
    return {
      $sort: { [columnName || 'createdAt']: orderBy === 'asc' ? 1 : -1 },
    };
  },
};
