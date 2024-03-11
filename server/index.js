import express from 'express';
import {read} from './routes/read.js'
import {client} from './database.js'

const app = express();
const port = 3000;

read(app, client)

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});