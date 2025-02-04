// app.js
import { usersRouter } from './routes/usersRouter';
import express from 'express';
import path from 'path';
import { pool } from './db/pool.js';

//it was pruning pool because it wasn't
// being used when i used the start script
console.log(pool);
const app = express();

app.set('view engine', 'ejs');
//had to add this because build folder couldn't see views
app.set('views', path.join(__dirname, '../src/views'));
//to process strings sent back in req.body
//extended true because it allows nested json
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(process.cwd(), 'src/public/')));
app.use('/', usersRouter);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Express app listening on port ${PORT}!`));
