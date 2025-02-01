//allowing routing
import { Router } from 'express';
import {
	usersListGet,
	usersCreateGet,
	usersCreatePost,
	usersDeletePost,
	usersUpdateGet,
	usersUpdatePost,
} from '../controllers/usersController';

//perform router on the subdirectory /users
export const usersRouter = Router();
usersRouter.get('/', usersListGet);
usersRouter.get('/create', usersCreateGet);
usersRouter.post('/create', ...usersCreatePost);
usersRouter.get('/:id/update', usersUpdateGet);
usersRouter.post('/:id/update', ...usersUpdatePost);
usersRouter.post('/:id/delete', usersDeletePost);
