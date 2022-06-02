import { Router } from "express";
import cartControllers from "../controllers/cartControllers";

const routerCart = Router();

routerCart.route("/").post(cartControllers.createCart);

routerCart.route("/:id").delete(cartControllers.deleteCart);

routerCart.route('/:id/productos')
.get(cartControllers.getAllProductsInCart)
.post(cartControllers.addProduct)

routerCart.route('/:id/productos/:id_prod').delete(cartControllers.deleteProductFromCart)

export default routerCart;
