import { Router } from "express";
import { Product } from "../models/product";
import { Container } from "../utils/container";


const routerProducts = Router();
let isAdmin:boolean=true;
const productContainer = new Container('src/database/productsContainer.txt')

routerProducts.get('/:id?',(req,res)=>{
    //muestro todos los productos disponibles o si me pasan id, solo ese prod
    let {id} = req.params;
    if(id){
        productContainer.getById(parseInt(id)).then(product=>{
            if(product == null){
                return res.status(404).json({error:'Product not found'})
            }
            return res.json(product)
        })
       
    }else{
        productContainer.getAll().then(lista =>{
            return res.json(lista)
        })
        //pasa todo el array de productos en el json
        
    }
    
})
routerProducts.post('/',(req,res)=>{
    if(!isAdmin){
        return res.status(401).json({error:401,description:`Route: ${req.url}, Method: ${req.method} Unauthorized`})
    }
    let body:Product = req.body;
    productContainer.save(body).then(item =>{
        return res.json(item)
    })
   
})

routerProducts.put('/:id',(req,res)=>{
    if(!isAdmin){
        return res.status(401).json({error:401,description:`Route: ${req.url}, Method: ${req.method} Unauthorized`})
    }
    let {id} = req.params;
    let body:Product = req.body;
    if(id){
        //si pasa el id actualiza el producto y pasalo al json
        
        return res.json()
    }else{
        //si no lo encontras mandale un 404
        return res.json()
    }
    
})
routerProducts.delete('/:id',(req,res)=>{
    if(!isAdmin){
        return res.status(401).json({error:401,description:`Route: ${req.url}, Method: ${req.method} Unauthorized`})
    }
    let {id} = req.params;
    if(id){
        //si pasa el id borra el producto y pasalo al json
        
        return res.json()
    }else{
        //si no lo encontras mandale un 404
        return res.json()
    }
    
})
export {routerProducts}