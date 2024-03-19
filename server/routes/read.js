/* eslint-disable no-continue */
/* eslint-disable no-restricted-syntax */
const filter = async (client, criteria) => {
  console.log(criteria);
  const query = {};
  for (const [key, value] of Object.entries(criteria)) {
    if (key === "nPerPage" || key === "page") {
      continue;
    }
    query[key] = { $regex: value, $options: "i" };
    if (value[0] === "<") {
      query[key] = { $lt: Number(value.slice(1)) };
    }
    if (value[0] === ">") {
      query[key] = { $gt: Number(value.slice(1)) };
    }
    if (value.includes("-")) {
      const hyphenPos = value.indexOf("-");
      query[key] = {
        $gte: Number(value.slice(0, hyphenPos)),
        $lte: Number(value.slice(hyphenPos + 1)),
      };
    }
  }
  console.log(query);
  const page = Number(criteria.page);
  const nPerPage = Number(criteria.nPerPage);
  await client.connect();
  const db = client.db("RNA-virus");
  const collection = db.collection("properties-2");
  const findResult = collection
    .find(query)
    .sort({ _id: 1 })
    .skip(page >= 0 ? page * nPerPage : 0)
    .limit(nPerPage)
    .project({ name: 1, source: 1, sourceId: 1, type: 1 });
  const result = await findResult.toArray();
  return result;
};

const readTotalNum = async (client) => {
  await client.connect();
  const db = client.db("RNA-virus");
  const collection = db.collection("properties-2");
  const totalNum = collection.countDocuments();
  return totalNum;
};

const findOne = async (client, criteria) => {
  await client.connect();
  const db = client.db("RNA-virus");
  const collection = db.collection("properties-2");
  const findResult = collection.find(criteria);
  const result = await findResult.toArray();
  return result;
};

const filterRowNum = async (client, criteria) => {
  console.log(criteria);
  const query = {};
  for (const [key, value] of Object.entries(criteria)) {
    if (key === "nPerPage" || key === "page") {
      continue;
    }
    query[key] = { $regex: value, $options: "i" };
    if (value[0] === "<") {
      query[key] = { $lt: Number(value.slice(1)) };
    }
    if (value[0] === ">") {
      query[key] = { $gt: Number(value.slice(1)) };
    }
    if (value.includes("-")) {
      const hyphenPos = value.indexOf("-");
      query[key] = {
        $gte: Number(value.slice(0, hyphenPos)),
        $lte: Number(value.slice(hyphenPos + 1)),
      };
    }
  }
  console.log(query);
  await client.connect();
  const db = client.db("RNA-virus");
  const collection = db.collection("properties-2");
  const totalNum = await collection.countDocuments(query);
  console.log(totalNum);
  return totalNum;
};

export { filter, readTotalNum, findOne, filterRowNum };
