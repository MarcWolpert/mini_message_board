import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import path from 'node:path';

const app = express();

app.set('views', path.join(process.cwd(), 'src', 'views'));
app.set('view engine', 'ejs');

const assetsPath: string = path.join(process.cwd(), 'src', 'public');
app.use(express.static(assetsPath));
app.use(express.urlencoded({ extended: true }));

const messages: { text: string; user: string; added: Date }[] = [
	{ text: 'Hi there!', user: 'Amando', added: new Date() },
	{
		text: 'Hello World!',
		user: 'Charles',
		added: new Date(),
	},
];

//passing in objects to render in ejs
app.get('/', (req: Request, res: Response) => {
	res.render('index', { title: 'Mini Message Board', messages: messages });
});
app.get('/new', (req: Request, res: Response) => {
	res.render('form', { title: 'Message Form' });
});
app.post('/new', (req: Request, res: Response) => {
	//access the POST request's data with req.body
	messages.push({
		text: req.body.message_text,
		user: req.body.message_user,
		added: new Date(),
	});
	// res.render('new', { title: 'Mini Message Board', messages: messages });
	res.redirect('/');
});
app.all('*', (req: Request, res: Response) => {
	res.send('404');
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
	console.error(err);
	res.status(500).send(err);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Express app booted, listening on port ${PORT}`);
});
