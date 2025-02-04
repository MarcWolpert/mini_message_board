// controllers/usersController.js
import { pool } from '../db/pool';
import { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { userInfo } from '../db/pool';
import { getUsers } from '../db/queries';

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

const validateSearch = [
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
];

//DONE
//renders the users list
export const usersListGet = async (req: Request, res: Response) => {
	try {
		const users = await getUsers();
		res.render('index', {
			title: 'User list',
			users,
		});
	} catch (error) {
		console.error('Error: ', error);
	}
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

// usersRouter.get('/search', usersSearchGet);
export const usersSearchGet = (req: Request, res: Response) => {
	res.render('searchUser', { title: 'Search' });
};

// usersRouter.post('/search', usersSearchPost);
export const usersSearchPost = [
	validateSearch,
	(req: Request, res: Response) => {
		//first+last name
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			//have to update createUser to render these errors
			return res.status(400).render('searchUser', {
				title: 'searchUser',
				//gets the validation errors
				errors: errors.array(),
			});
		}
		const resId: null | userInfo = usersStorage.search(
			req.body?.firstName,
			req.body?.lastName,
			req.body?.email,
		)[0];
		if (resId) {
			res.redirect(`/${resId.id}`);
		} else {
			res.redirect('/');
		}
	},
];

export const userFoundGet = (req: Request, res: Response) => {
	console.log(req.params);
	const user = usersStorage.getUser(req.params.id);
	if (!user) {
		return res.redirect('/');
	}
	res.render('singleUser', { title: 'Single User', user: user });
};
