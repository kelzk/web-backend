const read = async (client) => {
  await client.connect();
  const db = client.db("RNA-virus");
  const collection = db.collection("properties");
  const findResult = collection.find();
  const result = await findResult.toArray();
  return result;
};

export { read };
