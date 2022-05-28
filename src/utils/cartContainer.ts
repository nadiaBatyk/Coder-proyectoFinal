import * as fs from "fs";
import { Cart } from "../models/cart";
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
        return error;
      }
    }
  }
  async addProductToCart(product: Product, idCart: number) {
    let contenido: Array<Cart> = await this.getAllCarts();
    let carritoIndex = contenido.findIndex((item: Cart) => {
      return item.id === idCart;
    });
    if (carritoIndex > -1) {
      contenido[carritoIndex].products.length
        ? (product["id"] = contenido[carritoIndex].products[contenido[carritoIndex].products.length - 1].id + 1)
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
      return contenido[carritoIndex];
    } else {
      return null;
    }
  }

  async getAllCarts() {
    try {
      const archivo = await fs.promises.readFile(this.nombreArchivo, "utf-8");
      return JSON.parse(archivo);
    } catch (error) {
      console.log(error);
    }
  }
  async getCartById(id: number) {
    let contenido: Array<Cart> = await this.getAllCarts();
    let itemEncontrado = contenido.find((item: Cart) => {
      return item.id === id;
    });
    return itemEncontrado ? itemEncontrado : null;
  }
  async getProductsInCart(id: number) {
    let contenido: Array<Cart> = await this.getAllCarts();
    let itemEncontrado = contenido.find((item: Cart) => {
      return item.id === id;
    });
    return itemEncontrado ? itemEncontrado.products : null;
  }

  async deleteCartById(id: number) {
    try {
      let contenido: Array<Cart> = await this.getAllCarts();
      let indexItem: number = contenido.findIndex((item: Cart) => {
        return item.id === id;
      });
      contenido.splice(indexItem, 1);

      await fs.promises.writeFile(
        this.nombreArchivo,
        JSON.stringify(contenido, null, 2),
        "utf-8"
      );
      //  this.updateFile(contenido).then(res=>console.log(res))
      console.log(`Se eliminó el carrito: ${id}`);
      return id
    } catch (error) {
      return error;
    }
  }
  async deleteProductFromCart(idProduct: number, idCart: number) {
    try {
      let contenido: Array<Cart> = await this.getAllCarts();
      let indexCarrito: number = contenido.findIndex((item: Cart) => {
        return item.id === idCart;
      });
      let indexProduct = contenido[indexCarrito].products.findIndex(
        (item: Product) => {
          return item.id === idProduct;
        }
      );
      contenido[indexCarrito].products.splice(indexProduct, 1);

      await fs.promises.writeFile(
        this.nombreArchivo,
        JSON.stringify(contenido, null, 2),
        "utf-8"
      );
      //this.updateFile(contenido).then(res=>console.log(res))
      console.log(
        `Se eliminó el producto: ${idProduct} del carrito ${idCart} `
      );
      return idProduct
    } catch (error) {
      return error;
    }
  }
  async updateFile(content: Array<Cart>) {
    await fs.promises.writeFile(
      this.nombreArchivo,
      JSON.stringify(content, null, 2),
      "utf-8"
    );
  }
}
