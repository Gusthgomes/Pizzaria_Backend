import { Router } from 'express';
import multer from 'multer';
import { CreateUserController } from './controllers/user/CreateUserController';
import { AuthUserController } from './controllers/user/AuthUserController';
import { DetailUserController } from './controllers/user/DetailUserController';
import { isAuthenticated } from './middlewares/isAuthenticated';
import { CreateCategoryController } from './controllers/cotegory/CreateCategoryController';
import { ListCategoryController } from './controllers/cotegory/ListCategoryController';
import { CreateProductsController } from './controllers/products/CreateProductsController';
import uploadConfig from './config/multer';

const router = Router();

const upload = multer(uploadConfig.upload("./tmp"));

// -- ROUTERS USERS --
router.post('/users', new CreateUserController().handle)
router.post('/session', new AuthUserController().handle)

// call the security middleware for the router
router.get('/me', isAuthenticated, new DetailUserController().handle);

// ROUTERS CATEGORYS
router.post('/category', isAuthenticated, new CreateCategoryController().handle);
router.get('/category', isAuthenticated, new ListCategoryController().handle);

// ROUTERS PRODUCTS
router.post('/products', isAuthenticated, upload.single('file'),  new CreateProductsController().handle);


export{ router };