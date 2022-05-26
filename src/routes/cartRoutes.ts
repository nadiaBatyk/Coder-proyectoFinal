import { Router } from "express";
import { Cart } from "../models/cart";
import { Product } from "../models/product";

const routerCart = Router();

//CREATE A NEW CART
routerCart.post("/", (req, res) => {
  let body:Cart = req.body;
  //returns id
  return res.json();
});
//DELETE THE CART
routerCart.delete("/:id", (req, res) => {
  let { id } = req.params;
  let body = req.body;
  //returns success/error mssg
  return res.json();
});

//returns all the products included in the cart
routerCart.get("/:id/productos", (req, res) => {
  let { id } = req.params;
  if (id) {
    //si pasa el id busca el carrito y pasalo al json

    return res.json();
  } else {
    //si no lo encontras mandale un 404
    return res.json();
  }
});
//ADD PRODUCT TO A CART
routerCart.post("/:id/productos", (req, res) => {
  let { id } = req.params;
  let body:Product = req.body;
  return res.send();
});

//DELETE a single product from an specific cart
routerCart.delete("/:id/productos/:id_prod", (req, res) => {
  let { id:idCart,id_prod:idProduct } = req.params;
  if (idCart) {
    //si pasa el id borra el producto y pasalo al json

    return res.json();
  } else {
    //si no lo encontras mandale un 404
    return res.json();
  }
});
export {routerCart}