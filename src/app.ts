import express from 'express'
import bodyParser from 'body-parser';
import ejs from 'ejs';

export const app = express();

app.use(bodyParser.json());


