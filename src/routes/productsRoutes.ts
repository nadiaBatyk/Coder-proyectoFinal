import { Router } from "express";
import productsController from "../controllers/productsController";

const routerProducts = Router();

routerProducts.route('/')
.get(productsController.getProducts)
.post(productsController.createProduct)

routerProducts.route('/:id')
.get(productsController.getProducts)
.put(productsController.updateProduct)
.delete(productsController.deleteProduct);


export default routerProducts;