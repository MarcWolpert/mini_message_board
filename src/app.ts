import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import path from 'node:path';

const app = express();

app.set('views', path.join(process.cwd(), 'src', 'views'));
app.set('view engine', 'ejs');

const assetsPath: string = path.join(process.cwd(), 'src', 'public');
app.use(express.static(assetsPath));

const links: { href: String; text: string }[] = [
	{ href: '/', text: 'Home' },
	{ href: 'about', text: 'About' },
];
const users = ['Rose', 'Cake', 'Biff'];

//passing in objects to render in ejs
app.get('/', (req: Request, res: Response) => {
	res.render('index', { message: 'EJS Rocks!', links, users });
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
