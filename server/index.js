import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { read, filter, readTotalNum, findOne } from "./routes/read.js";
import { client } from "./database.js";

const app = express();
const port = 3000;

app.use(cors({ origin: "http://localhost:3001" }));
app.use(bodyParser.json());

app.get("/", async (req, res) => {
  try {
    const result = await read(client);
    res.send(result);
  } catch (error) {
    console.error("Error querying the database:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/filter", async (req, res) => {
  try {
    const result = await filter(client, req.body);
    res.send(result);
  } catch (error) {
    console.error("Error querying the database:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/findOne", async (req, res) => {
  try {
    const result = await findOne(client, req.body);
    res.send(result);
  } catch (error) {
    console.error("Error querying the database:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/holdings", async (req, res) => {
  try {
    const result = await readTotalNum(client);
    res.send(result.toString());
  } catch (error) {
    console.error("Error querying the database:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
