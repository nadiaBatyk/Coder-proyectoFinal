import { Product } from "./product";

export interface Cart {
    id:number,
    timestamp:Date,
    products:Array<Product>
}