import { Router } from "express";
import { Cart } from "../models/cart";
import { Product } from "../models/product";
import { CartContainer } from "../utils/cartContainer";

const routerCart = Router();
const cartContainer = new CartContainer('src/database/cartContainer.txt')
//CREATE A NEW CART
routerCart.post("/", (req, res) => {
  let body:Cart = req.body;
  cartContainer.create(body).then(item =>{
    if(item){
      return res.status(200).json(item);
    }return res.status(500).json({error:`Ocurrió un error al crear el carrito`})
    
  })
  
  
});
//DELETE THE CART
routerCart.delete("/:id", (req, res) => {
  let { id } = req.params;
  if(id){
    cartContainer.deleteCartById(parseInt(id)).then(result =>{
      if(result === parseInt(id)){
        return res.status(200).json(result)
      }return res.status(500).json({error:`Ocurrió un error al eliminar el item ${id} `})
    })
  }
  //returns success/error mssg
  
});

//returns all the products included in the cart
routerCart.get("/:id/productos", (req, res) => {
  let { id } = req.params;
  if (id) {
    //si pasa el id busca el carrito y pasalo al json
    cartContainer.getProductsInCart((parseInt(id))).then(products=>{
      if(products){
        return res.status(200).json(products)
      }return res.status(404).json({error:`Carrito #${id} no encontrado`})
    })
    
  } 
});
//ADD PRODUCT TO A CART
routerCart.post("/:id/productos", (req, res) => {
  let { id } = req.params;
  let body:Product = req.body;
  cartContainer.addProductToCart(body,parseInt(id)).then(item =>{
    if(item){
      return res.status(200).json(item);
    }return res.status(500).json({error:`Ocurrió un error al agregar el producto ${body.id} al carrito ${id} `})
    
  })
});

//DELETE a single product from an specific cart
routerCart.delete("/:id/productos/:id_prod", (req, res) => {
  let { id:idCart,id_prod:idProduct } = req.params;
  if (idCart) {
    //si pasa el id borra el producto y pasalo al json
    cartContainer.deleteProductFromCart(parseInt(idProduct),parseInt(idCart)).then(item =>{
      if(item){
        return res.status(200).json(item);
      }return res.status(500).json({error:`Ocurrió un error al eliminar el producto ${idProduct} del carrito ${idCart} `})
      
    })
   
  } 
});
export {routerCart}