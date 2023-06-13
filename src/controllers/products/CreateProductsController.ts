import { Request, Response } from 'express';
import { CreateProductService } from '../../services/products/CreateProductService';

class CreateProductsController{
    async handle(req: Request, res: Response){
        const { name, price, description, category_id } = req.body;

        const createProductsController = new CreateProductService();

        if(!req.file){
            throw new Error("Error upload file")
        }else{

            const {originalname, filename: banner} = req.file;

            
            
            const product = await createProductsController.execute({
                name,
                price,
                description,
                banner,
                category_id,
            });
    
            return res.json(product);
        }
    }
}

export { CreateProductsController }