// controllers/usersController.js
import { pool } from '../db/pool';
import { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { userInfo } from '../db/pool';
import {
	getUsers,
	searchRecord,
	getUser,
	deleteUser,
	updateUser,
	addUser,
} from '../db/queries';

const alphaErr = 'must only contain letters.';
const lengthErr = 'must be between 1 and 10 characters.';
const emailErr = 'must be an email.';
const emailReq = 'required.';
const emailFormatErr = 'must be of an email format.';
const ageErr = 'is not numeric.';
const textAreaErr = 'must be between 0 and 200 characters.';

//checks for the error with isAlpha then checks for length error
const validateUser = [
	body('firstname')
		.trim()
		.isAlpha()
		.withMessage(`First name ${alphaErr}`)
		.isLength({ min: 1, max: 10 })
		.withMessage(`First name ${lengthErr}`),
	body('lastname')
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
		const { firstname, lastname, email, age, bio } = req.body;
		console.log(firstname, lastname, email, age, bio);
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).render('createUser', {
				title: 'Create user',
				errors: errors.array(),
			});
		}
		addUser({ firstname, lastname, email, age, bio });
		res.redirect('/');
	},
];

//DONE
export const usersUpdateGet = async (req: Request, res: Response) => {
	const id = parseInt(req.params.id);

	const user = await getUser(id);
	res.render('updateUser', {
		title: 'Update user',
		userId: id,
		user,
	});
};

//DONE
export const usersUpdatePost = [
	validateUser,
	async (req: Request, res: Response) => {
		//what it's doing is it's checking the stuff
		// already in the database
		//needs to be checking the new information
		const userId = parseInt(req.params.id);
		const user = await getUser(userId);
		const updatedUser = {
			firstname: req.body.firstname,
			lastname: req.body.lastname,
			email: req.body.email,
			age: req.body.age,
			bio: req.body.bio,
		};
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).render('updateUser', {
				title: 'Update user',
				userId,
				user: updatedUser,
				errors: errors.array(),
			});
		}
		console.log(errors);

		await updateUser(parseInt(req.params.id), updatedUser);
		res.redirect('/');
	},
];

//DONE
export const usersDeletePost = (req: Request, res: Response) => {
	deleteUser(parseInt(req.params.id));
	res.redirect('/');
};

//DONE
export const usersSearchGet = (req: Request, res: Response) => {
	res.render('searchUser', { title: 'Search' });
};

//DONE
export const usersSearchPost = [
	validateSearch,
	async (req: Request, res: Response) => {
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
		const resId: null | userInfo = await searchRecord(0, {
			id: 0,
			firstname: req.body?.firstname,
			lastname: req.body?.lastname,
			email: req.body?.email,
			age: 0,
		});
		if (resId) {
			res.redirect(`/${resId.id}`);
		} else {
			res.redirect('/');
		}
	},
];

export const userFoundGet = async (req: Request, res: Response) => {
	const user = await getUser(parseInt(req.params.id));
	if (!user) {
		return res.redirect('/');
	}
	res.render('singleUser', { title: 'Single User', user });
};
