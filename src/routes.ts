import { Router } from 'express';
import multer from 'multer';
import { CreateUserController } from './controllers/user/CreateUserController';
import { AuthUserController } from './controllers/user/AuthUserController';
import { DetailUserController } from './controllers/user/DetailUserController';
import { isAuthenticated } from './middlewares/isAuthenticated';
import { CreateCategoryController } from './controllers/cotegory/CreateCategoryController';
import { ListCategoryController } from './controllers/cotegory/ListCategoryController';
import { CreateProductsController } from './controllers/products/CreateProductsController';
import { ListByCategoryController } from './controllers/products/ListByCategoryController';
import { CreateOrderController } from './controllers/order/CreateOrderController';
import { RemoveOrderController } from './controllers/order/RemoveOrderController';
import { AddItemController } from './controllers/order/AddItemController';
import { RemoveItemController } from './controllers/order/RemoveItemController';
import { SendOrderController } from './controllers/order/SendOrderController';
import { ListOrderController } from './controllers/order/ListOrderController';
import uploadConfig from './config/multer';

const router = Router();

const upload = multer(uploadConfig.upload("./tmp"));

// -- ROUTES USERS --
router.post('/users', new CreateUserController().handle)
router.post('/session', new AuthUserController().handle)

// call the security middleware for the router
router.get('/me', isAuthenticated, new DetailUserController().handle);

// ROUTES CATEGORYS
router.post('/category', isAuthenticated, new CreateCategoryController().handle);
router.get('/category', isAuthenticated, new ListCategoryController().handle);

// ROUTES PRODUCTS
router.post('/products', isAuthenticated, upload.single('file'),  new CreateProductsController().handle);
router.get('/category/product', isAuthenticated, new ListByCategoryController().handle);

//ROUTES ORDER
router.post('/order', isAuthenticated, new CreateOrderController().handle);
router.delete('/order', isAuthenticated, new RemoveOrderController().handle);
router.post('/order/add', isAuthenticated, new AddItemController().handle);
router.delete('/order/remove', isAuthenticated, new RemoveItemController().handle);
router.put('/order/send', isAuthenticated, new SendOrderController().handle);
router.get('/orders', isAuthenticated, new ListOrderController().handle);

export{ router };

