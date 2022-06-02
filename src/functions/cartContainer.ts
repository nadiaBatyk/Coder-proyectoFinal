import * as fs from "fs";
import { Cart } from "../models/cart";
import ErrorCustom from "../models/error";
import { Product } from "../models/product";

export class CartContainer {
  nombreArchivo: string;
  constructor(nombreArchivo: string) {
    this.nombreArchivo = nombreArchivo;
  }
  async create(carrito: Cart) {
    try {
      const archivo = await fs.promises.readFile(this.nombreArchivo, "utf-8");
      let contenido: Array<Cart> = JSON.parse(archivo);
      contenido.length
        ? (carrito["id"] = contenido[contenido.length - 1].id + 1)
        : (carrito["id"] = 1);

      contenido.push(carrito);
      await fs.promises.writeFile(
        this.nombreArchivo,
        JSON.stringify(contenido, null, 2),
        "utf-8"
      );
      console.log(`Se agregó el carrito: ${carrito.id}`);
      return carrito.id;
    } catch (error: any) {
      if (error.code === "ENOENT") {
        carrito["id"] = 1;

        await fs.promises.writeFile(
          this.nombreArchivo,
          JSON.stringify([carrito], null, 2),
          "utf-8"
        );
        console.log(`Se agregó el carrito: ${carrito.id}`);
        return carrito.id;
      } else {
        const err = new ErrorCustom(error, 500, "Error");
        throw err;
      }
    }
  }
  async addProductToCart(product: Product, idCart: number) {
    try {
      let contenido: Array<Cart> = await this.getAllCarts();
      let carritoIndex = contenido.findIndex((item: Cart) => {
        return item.id === idCart;
      });
      if (carritoIndex === -1) {
        const err = new ErrorCustom(
          `Carrito no encontrado ${idCart}`,
          404,
          "Not found"
        );
        throw err;
      }

      contenido[carritoIndex].products.length
        ? (product["id"] =
            contenido[carritoIndex].products[
              contenido[carritoIndex].products.length - 1
            ].id + 1)
        : (product["id"] = 1);
      contenido[carritoIndex].products.push(product);
      await fs.promises.writeFile(
        this.nombreArchivo,
        JSON.stringify(contenido, null, 2),
        "utf-8"
      );
      console.log(
        `Se agregó el producto: ${product.id} al carrito ${contenido[carritoIndex].id} `
      );
      return contenido[carritoIndex].id;
    } catch (error: any) {
      if (error instanceof ErrorCustom) {
        throw error;
      } else {
        const err = new ErrorCustom(error, 500, "Error");
        throw err;
      }
    }
  }

  async getAllCarts() {
    try {
      const archivo = await fs.promises.readFile(this.nombreArchivo, "utf-8");
      return JSON.parse(archivo);
    } catch (error: any) {
      const err = new ErrorCustom(error, 500, "Error");
      throw err;
    }
  }
  async getCartById(id: number) {
    try {
      let contenido: Array<Cart> = await this.getAllCarts();
      let itemEncontrado = contenido.find((item: Cart) => {
        return item.id === id;
      });
      if (itemEncontrado) {
        return itemEncontrado;
      } else {
        const err = new ErrorCustom("Carrito no encontrado", 404, "Not found");
        throw err;
      }
    } catch (error: any) {
      if (error instanceof ErrorCustom) {
        throw error;
      } else {
        const err = new ErrorCustom(error, 500, "Error");
        throw err;
      }
    }
  }
  async getProductsInCart(id: number) {
    try {
      let contenido: Array<Cart> = await this.getAllCarts();
      let itemEncontrado = contenido.find((item: Cart) => {
        return item.id === id;
      });
      if (itemEncontrado) {
        return itemEncontrado?.products;
      } else {
        const err = new ErrorCustom("Carrito no encontrado", 404, "Not found");
        throw err;
      }
    } catch (error: any) {
      if (error instanceof ErrorCustom) {
        throw error;
      } else {
        const err = new ErrorCustom(error, 500, "Error");
        throw err;
      }
    }
  }

  async deleteCartById(id: number) {
    try {
      let contenido: Array<Cart> = await this.getAllCarts();
      let indexItem: number = contenido.findIndex((item: Cart) => {
        return item.id === id;
      });
      contenido.splice(indexItem, 1);
      if (indexItem === -1) {
        const err = new ErrorCustom("Carrito no encontrado", 404, "Not found");
        throw err;
      }
      await fs.promises.writeFile(
        this.nombreArchivo,
        JSON.stringify(contenido, null, 2),
        "utf-8"
      );

      console.log(`Se eliminó el carrito: ${id}`);
      return `Se eliminó el carrito`;
    } catch (error: any) {
      if (error instanceof ErrorCustom) {
        throw error;
      } else {
        const err = new ErrorCustom(error, 500, "Error");
        throw err;
      }
    }
  }
  async deleteProductFromCart(idProduct: number, idCart: number) {
    try {
      let contenido: Array<Cart> = await this.getAllCarts();
      let indexCarrito: number = contenido.findIndex((item: Cart) => {
        return item.id === idCart;
      });
      if (indexCarrito === -1) {
        const err = new ErrorCustom("Carrito no encontrado", 404, "Not found");
        throw err;
      }

      let indexProduct = contenido[indexCarrito].products.findIndex(
        (item: Product) => {
          return item.id === idProduct;
        }
      );
      if (indexProduct === -1) {
        const err = new ErrorCustom(
          "Producto no encontrado en el carrito",
          404,
          "Not found"
        );
        throw err;
      }
      contenido[indexCarrito].products.splice(indexProduct, 1);

      await fs.promises.writeFile(
        this.nombreArchivo,
        JSON.stringify(contenido, null, 2),
        "utf-8"
      );
      
      return `Se eliminó el producto: ${idProduct} del carrito ${idCart} `
      
    } catch (error: any) {
      if (error instanceof ErrorCustom) {
        throw error;
      } else {
        const err = new ErrorCustom(error, 500, "Error");
        throw err;
      }
    }
  }
}
