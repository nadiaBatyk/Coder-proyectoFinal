import * as fs from "fs";
import { Cart } from "../models/cart";
import { Product } from "../models/product";

export class Container {
  nombreArchivo: string;
  constructor(nombreArchivo: string) {
    this.nombreArchivo = nombreArchivo;
  }
  async save(objeto: Product | Cart) {
    try {
      const archivo = await fs.promises.readFile(this.nombreArchivo, "utf-8");
      let contenido:Array<Product|Cart> = JSON.parse(archivo);
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
        console.log(error);
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
      if (indexProducto > -1) {
        contenido[indexProducto] = objeto;
        await fs.promises.writeFile(
          this.nombreArchivo,
          JSON.stringify(contenido, null, 2),
          "utf-8"
        );
        console.log(`Se actualizo el producto: ${objeto.id}`);
        return objeto.id;
      } else {
        throw Error;
      }
    } catch (error: any) {
      console.log(error);
    }
  }
  async getAll() {
    try {
      const archivo = await fs.promises.readFile(this.nombreArchivo, "utf-8");
      return JSON.parse(archivo);
    } catch (error) {
      console.log(error);
    }
  }
  async getById(id: number) {
    let contenido:Array<Product|Cart> = await this.getAll();
    let itemEncontrado = contenido.find((item: any) => {
      return item.id === id;
    });
    return itemEncontrado ? itemEncontrado : null;
  }

  async deleteById(id: number) {
    try {
      let contenido :Array<Product|Cart> = await this.getAll();
      let indexItem:number = contenido.findIndex((item: any) => {
        return item.id === id;
      });
      contenido.splice(indexItem, 1);

      await fs.promises.writeFile(
        this.nombreArchivo,
        JSON.stringify(contenido, null, 2),
        "utf-8"
      );
      console.log(`Se eliminó el producto: ${id}`);
    } catch (error) {
      console.log(error);
    }
  }
}
