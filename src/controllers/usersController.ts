// controllers/usersController.js
import usersStorage from '../storages/usersStorage';
import { Request, Response } from 'express';

//renders the users list
export const usersListGet = (req: Request, res: Response) => {
	res.render('index', {
		title: 'User list',
		users: usersStorage.getUsers(),
	});
};

//renders the user creation form
export const usersCreateGet = (req: Request, res: Response) => {
	res.render('createUser', {
		title: 'Create user',
	});
};

//performs the database operation for user creation form submission
export const usersCreatePost = (req: Request, res: Response) => {
	const { firstName, lastName } = req.body;
	usersStorage.addUser({ firstName, lastName });
	res.redirect('/');
};
