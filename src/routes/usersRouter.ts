//allowing routing
import { Router } from 'express';
import {
	usersListGet,
	usersCreateGet,
	usersCreatePost,
} from '../controllers/usersController';

//perform router on the subdirectory /users
export const usersRouter = Router();
usersRouter.get('/', usersListGet);
usersRouter.get('/create', usersCreateGet);
usersRouter.post('/create', usersCreatePost);
