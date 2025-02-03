//allowing routing
import { Router } from 'express';
import {
	usersListGet,
	usersCreateGet,
	usersCreatePost,
	usersDeletePost,
	usersUpdateGet,
	usersUpdatePost,
	usersSearchGet,
	usersSearchPost,
	userFoundGet,
} from '../controllers/usersController';

//perform router on the subdirectory /users
export const usersRouter = Router();

usersRouter.get('/search', usersSearchGet);
usersRouter.post('/search', ...usersSearchPost);
usersRouter.get('/create', usersCreateGet);
usersRouter.post('/create', ...usersCreatePost);
usersRouter.get('/:id/update', usersUpdateGet);
usersRouter.post('/:id/update', ...usersUpdatePost);
usersRouter.post('/:id/delete', usersDeletePost);
usersRouter.get('/:id', userFoundGet);
usersRouter.get('/', usersListGet);
