import { Product } from "../models/product";
import { ProductsContainer } from "../functions/productsContainer";

let isAdmin: boolean = true;
const productContainer = new ProductsContainer(
  "src/database/productsContainer.txt"
);

function getProducts(req, res, next) {
  //muestro todos los productos disponibles o si me pasan id, solo ese prod
  let { id } = req.params;
  if (id) {
    productContainer.getById(parseInt(id)).then(
      (product) => {
        return res.json(product);
      },
      (error) => {
        console.log(error);
        return next(error);
      }
    );
  } else {
    productContainer.getAll().then(
      (lista) => {
        return res.json(lista);
      },
      (error) => next(error)
    );
    //pasa todo el array de productos en el json
  }
}
function createProduct(req, res, next) {
  if (!isAdmin) {
    return res.status(401).json({
      error: 401,
      description: `Route: ${req.url}, Method: ${req.method} Unauthorized`,
    });
  }
  let body: Product = req.body;
  productContainer.create(body).then(
    (item) => {
      return res.json(item);
    },
    (error) => next(error)
  );
}

function updateProduct(req, res, next) {
  if (!isAdmin) {
    return res.status(401).json({
      error: 401,
      description: `Route: ${req.url}, Method: ${req.method} Unauthorized`,
    });
  }
  let { id } = req.params;
  let body: Product = req.body;
  if (id) {
    //si pasa el id actualiza el producto y pasalo al json
    productContainer.update(body).then(
      (item) => {
        return res.status(200).json(item);
      },
      (error) => next(error)
    );
  }
}
function deleteProduct(req, res, next) {
  if (!isAdmin) {
    return res.status(401).json({
      error: 401,
      description: `Route: ${req.url}, Method: ${req.method} Unauthorized`,
    });
  }
  let { id } = req.params;
  if (id) {
    //si pasa el id borra el producto y pasalo al json
    productContainer.deleteById(parseInt(id)).then(
      (item) => {
        return res.status(200).json(item);
      },
      (error) => next(error)
    );
  }
}

export default { createProduct, deleteProduct, updateProduct, getProducts };
