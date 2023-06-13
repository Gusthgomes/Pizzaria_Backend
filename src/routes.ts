import { Router } from 'express';
import { CreateUserController } from './controllers/user/CreateUserController';
import { AuthUserController } from './controllers/user/AuthUserController';
import { DetailUserController } from './controllers/user/DetailUserController';
import { isAuthenticated } from './middlewares/isAuthenticated';
import { CreateCategoryController } from './controllers/cotegory/CreateCategoryController';

const router = Router();

// -- ROUTERS USERS --
router.post('/users', new CreateUserController().handle)
router.post('/session', new AuthUserController().handle)

// call the security middleware for the router
router.get('/me', isAuthenticated, new DetailUserController().handle);

// ROUTERS CATEGORYS
router.post('/category', isAuthenticated, new CreateCategoryController().handle);

export{ router };