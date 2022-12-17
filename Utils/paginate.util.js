/*
Paginates output of databse query
Accepts:
- model: sequelize model
- pageNr
- pageSize: number of items on page
- search: search queries
- order: order array for sequelize query
- transform: fn to be applied to all row
*/

export const paginate = async (
  model,
  pageNr,
  pageSize,
  pageMax,
  search = {},
  order = [],
  transform
) => {
  try {
    const page = parseInt(pageNr, 10) || 1;
    const maxSize = parseInt(pageMax, 10) || 30;
    const size =
      parseInt(pageSize, 10) || 10 > maxSize
        ? maxSize
        : parseInt(pageSize, 10) || 10;
    let options = {
      offset: findOffset(page, size),
      limit: size,
    };
    if (Object.keys(search).length) {
      options["where"] = search;
    }

    if (order && order.length) {
      options["order"] = order;
    }

    let { count, rows } = await model.findAndCountAll(options);
    if (transform && typeof transform === "function") {
      rows = transform(rows);
    }

    return {
      previousPage: getPreviousPage(page),
      currentPage: page,
      nextPage: getNextPage(page, size, count),
      total: count,
      pageSize: pageSize,
      data: rows,
    };
  } catch (err) {
    console.log(err);
  }
};

const findOffset = (page, size) => {
  return page * size - size;
};

const getNextPage = (page, limit, total) => {
  if (total / limit > page) {
    return page + 1;
  }

  return null;
};

const getPreviousPage = (page) => {
  if (page <= 1) {
    return null;
  }
  return page - 1;
};
