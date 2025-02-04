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

//DONE
usersRouter.get('/search', usersSearchGet);

//DONE
usersRouter.post('/search', ...usersSearchPost);

//DONE
usersRouter.get('/create', usersCreateGet);

//IN PROGRESS
usersRouter.post('/create', ...usersCreatePost);

//DONE
usersRouter.get('/:id/update', usersUpdateGet);

//DONE
usersRouter.post('/:id/update', ...usersUpdatePost);

// DONE
usersRouter.post('/:id/delete', usersDeletePost);

//DONE
usersRouter.get('/:id', userFoundGet);

//DONE
usersRouter.get('/', usersListGet);
