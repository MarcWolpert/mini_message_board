// app.js
import path from 'path';
import { Pool } from 'pg';
import express, { Request, Response } from 'express';
import session from 'express-session';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import 'dotenv/config';

const pool = new Pool({
	host: process.env.HOST,
	user: process.env.USER,
	max: 20,
	port: parseInt(process.env.DB_PORT),
	database: process.env.DATABASE,
	password: process.env.PASSWORD,
});

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../src/views'));

//here we will use a session secret for security
app.use(session({ secret: 'cats', resave: false, saveUninitialized: false }));
app.use(passport.session());
//disable nested objects
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(process.cwd(), 'src/public/')));
app.use('/sign-up', (req: Request, res: Response) => {
	res.render('sign-up', { title: 'Sign Up' });
});
app.post('/sign-up', async (req, res, next) => {
	try {
		await pool.query(
			'INSERT INTO users (username, password) VALUES ($1, $2)',
			[req.body.username, req.body.password],
		);
		res.redirect('/');
	} catch (err) {
		return next(err);
	}
});
app.use('/', (req: Request, res: Response) => {
	res.render('index', { title: 'Homepage' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Express app listening on port ${PORT}!`));
