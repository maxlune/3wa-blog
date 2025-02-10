import express from 'express'
import { dbConnect } from './database';
import bodyParser from 'body-parser';

export const app = express();

app.use(bodyParser.json());

dbConnect();
