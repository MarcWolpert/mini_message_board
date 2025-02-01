// app.js
import { usersRouter } from './routes/usersRouter';
import express from 'express';
import path from 'path';

const app = express();

app.set('view engine', 'ejs');
//had to add this because build folder couldn't see views
app.set('views', path.join(__dirname, '../src/views'));
//to process strings sent back in req.body
//extended true because it allows nested json
app.use(express.urlencoded({ extended: true }));
app.use('/', usersRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Express app listening on port ${PORT}!`));
