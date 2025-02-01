// controllers/usersController.js
import usersStorage from '../storages/usersStorage';
import { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

const alphaErr = 'must only contain letters.';
const lengthErr = 'must be between 1 and 10 characters.';
const emailErr = 'must be an email.';
const emailReq = 'required.';
const emailFormatErr = 'must be of an email format.';
const ageErr = 'is not numeric.';
const textAreaErr = 'must be between 0 and 200 characters.';

//checks for the error with isALpha then checks for length error
const validateUser = [
	body('firstName')
		.trim()
		.isAlpha()
		.withMessage(`First name ${alphaErr}`)
		.isLength({ min: 1, max: 10 })
		.withMessage(`First name ${lengthErr}`),

	body('lastName')
		.trim()
		.isAlpha()
		.withMessage(`Last name ${alphaErr}`)
		.isLength({ min: 1, max: 10 })
		.withMessage(`Last name ${lengthErr}`),
	//required must be formatted properly
	body('email')
		.not()
		.isEmpty()
		.withMessage(`Email ${emailReq}`)
		.trim()
		.isEmail()
		.normalizeEmail()
		.withMessage(`Email ${emailFormatErr}`),

	//optional must be a number between 18 and 120
	body('age').trim().isNumeric().withMessage(`Age ${ageErr}`),
	//optional maximum 200 characters //FINISHED
	body('bio')
		.trim()
		.escape()
		.isLength({ min: 0, max: 200 })
		.withMessage(`Last name ${textAreaErr}`),
];

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

export const usersCreatePost = [
	validateUser,
	(req: Request, res: Response) => {
		const errors = validationResult(req);
		//redirected loop until it passes errors
		if (!errors.isEmpty()) {
			//have to update createUser to render these errors
			return res.status(400).render('createUser', {
				title: 'Create user',
				//gets the validation errors
				errors: errors.array(),
			});
		}
		const { firstName, lastName, email, age, bio } = req.body;
		usersStorage.addUser({ firstName, lastName, email, age, bio });
		res.redirect('/');
	},
];

export const usersUpdateGet = (req: Request, res: Response) => {
	const user = usersStorage.getUser(req.params.id);
	res.render('updateUser', {
		title: 'Update user',
		user: user,
	});
};

export const usersUpdatePost = [
	validateUser,
	(req: Request, res: Response) => {
		const user = usersStorage.getUser(req.params.id);
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).render('updateUser', {
				title: 'Update user',
				user: user,
				errors: errors.array(),
			});
		}
		const { firstName, lastName, email, age, bio } = req.body;
		usersStorage.updateUser(req.params.id, {
			firstName,
			lastName,
			email,
			age,
			bio,
		});
		res.redirect('/');
	},
];

export const usersDeletePost = (req: Request, res: Response) => {
	usersStorage.deleteUser(req.params.id);
	res.redirect('/');
};
