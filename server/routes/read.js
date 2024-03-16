const read = async (client) => {
  await client.connect();
  const db = client.db("RNA-virus");
  const collection = db.collection("properties-2");
  const findResult = collection
    .find()
    .project({ _id: 0, name: 1, source: 1, sourceId: 1, type: 1 });
  const result = await findResult.toArray();
  return result;
};

const filter = async (client, criteria) => {
  await client.connect();
  const db = client.db("RNA-virus");
  const collection = db.collection("properties-2");
  const findResult = collection
    .find(criteria)
    .project({ _id: 0, name: 1, source: 1, sourceId: 1, type: 1 });
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

export { read, filter, readTotalNum, findOne };
