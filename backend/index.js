import express from 'express';
import { PORT, mongoDBURL } from './config.js';
import mongoose from 'mongoose';
import booksRoute from './routes/booksRoute.js'
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  console.log(`Received ${req.method} request for ${req.url}`);
  return res.status(200).send(`WelCome to the MERN Stack Tutorial.`);
});

app.use('/books', booksRoute)

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log('App Connected to the mongoDB database.');
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log('MongoDB connection error:', error);
  });