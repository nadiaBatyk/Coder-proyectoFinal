import { Cart } from "../models/cart";
import { Product } from "../models/product";
import { CartContainer } from "../functions/cartContainer";

const cartContainer = new CartContainer("src/database/cartContainer.txt");
//CREATE A NEW CART
function createCart(req, res, next) {
  let body: Cart = req.body;
  cartContainer.create(body).then(
    (item) => {
      return res.json(item);
    },
    (error) => next(error)
  );
}

//DELETE THE CART
function deleteCart(req, res, next) {
  let { id } = req.params;
  if (id) {
    cartContainer.deleteCartById(parseInt(id)).then(
      (item) => {
        return res.status(200).json(item);
      },
      (error) => next(error)
    );
  }
}

//returns all the products included in the cart
function getAllProductsInCart(req, res, next) {
  let { id } = req.params;
  if (id) {
    //si pasa el id busca el carrito y pasalo al json
    cartContainer.getProductsInCart(parseInt(id)).then(
      (products) => {
        return res.json(products);
      },
      (error) => {
        console.log(error);
        return next(error);
      }
    );
  }
}
//ADD PRODUCT TO A CART
function addProduct(req, res, next){
    let { id } = req.params;
    let body: Product = req.body;
    cartContainer.addProductToCart(body, parseInt(id)).then( (item) => {
        return res.json(item);
      },
      (error) => next(error));
}


//DELETE a single product from an specific cart
function deleteProductFromCart(req,res,next){
    let { id: idCart, id_prod: idProduct } = req.params;
    if (idCart) {
      //si pasa el id borra el producto y pasalo al json
      cartContainer
        .deleteProductFromCart(parseInt(idProduct), parseInt(idCart))
        .then((item) => {
            return res.status(200).json(item);
          },
          (error) => next(error));
    }
}

export default { createCart,deleteCart,addProduct,deleteProductFromCart,getAllProductsInCart };
