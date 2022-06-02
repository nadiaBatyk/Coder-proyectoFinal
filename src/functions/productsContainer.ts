import { ErrorRequestHandler } from "express";
import * as fs from "fs";
import ErrorCustom from "../models/error";

import { Product } from "../models/product";

export class ProductsContainer {
  nombreArchivo: string;
  constructor(nombreArchivo: string) {
    this.nombreArchivo = nombreArchivo;
  }
  async create(objeto: Product) {
    try {
      const archivo = await fs.promises.readFile(this.nombreArchivo, "utf-8");
      let contenido: Array<Product> = JSON.parse(archivo);
      contenido.length
        ? (objeto["id"] = contenido[contenido.length - 1].id + 1)
        : (objeto["id"] = 1);

      contenido.push(objeto);
      await fs.promises.writeFile(
        this.nombreArchivo,
        JSON.stringify(contenido, null, 2),
        "utf-8"
      );
      console.log(`Se agregó el producto: ${objeto.id}`);
      return objeto.id;
    } catch (error: any) {
      if (error.code === "ENOENT") {
        objeto["id"] = 1;

        fs.promises.writeFile(
          this.nombreArchivo,
          JSON.stringify([objeto], null, 2),
          "utf-8"
        );
        console.log(`Se agregó el producto: ${objeto.id}`);
        return objeto.id;
      } else {
        const err = new ErrorCustom(error, 500, "Error");
        throw err;
      }
    }
  }
  async update(objeto: Product) {
    try {
      const archivo = await fs.promises.readFile(this.nombreArchivo, "utf-8");
      let contenido: Array<Product> = JSON.parse(archivo);
      let indexProducto: number = contenido.findIndex(
        (producto) => producto.id === objeto.id
      );
      if (indexProducto === -1) {
        const err = new ErrorCustom(
          `Item no encontrado ${objeto.id}`,
          404,
          "Not found"
        );
        throw err;
      }

      contenido[indexProducto] = objeto;
      await fs.promises.writeFile(
        this.nombreArchivo,
        JSON.stringify(contenido, null, 2),
        "utf-8"
      );
      console.log(`Se actualizo el producto: ${objeto.id}`);
      return objeto.id;
    } catch (error: any) {
      if (error instanceof ErrorCustom) {
        throw error;
      } else {
        const err = new ErrorCustom(error, 500, "Error");
        throw err;
      }
    }
  }
  async getAll() {
    try {
      const archivo = await fs.promises.readFile(this.nombreArchivo, "utf-8");
      return JSON.parse(archivo);
    } catch (error: any) {
      const err = new ErrorCustom(error, 500, "Error");
      throw err;
    }
  }
  async getById(id: number) {
    try {
      let contenido: Array<Product> = await this.getAll();
      let itemEncontrado = contenido.find((item: Product) => {
        return item.id === id;
      });
      if (itemEncontrado) {
        return itemEncontrado;
      } else {
        const err = new ErrorCustom("Item no encontrado", 404, "Not found");
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

  async deleteById(id: number) {
    try {
      let contenido: Array<Product> = await this.getAll();
      let indexItem: number = contenido.findIndex((item: Product) => {
        return item.id === id;
      });
      contenido.splice(indexItem, 1);
      if (indexItem === -1) {
        const err = new ErrorCustom("Item no encontrado", 404, "Not found");
        throw err;
      }
      await fs.promises.writeFile(
        this.nombreArchivo,
        JSON.stringify(contenido, null, 2),
        "utf-8"
      );
      console.log(`Se eliminó el producto: ${id}`);
      return `Se eliminó el producto`;
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
