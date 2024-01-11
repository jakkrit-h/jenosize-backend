import express, { Express } from 'express';
import JenosizeController from './controllers/JenosizeController';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();
const app: Express = express();
const PORT = 3000;
app.use(cors());
app.use('/jenosize', JenosizeController);

app.listen(PORT, () => {
  console.log(`START PORT:${PORT}`);
});
