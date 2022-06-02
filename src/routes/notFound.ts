import { json, Router } from "express";


const notFoundRouter = Router();

notFoundRouter.get('',(req,res)=>{
    return res.status(404).json({mensaje:`Error ruta ${req.baseUrl}, metodo ${req.method} no implementada`})
})
notFoundRouter.post('',(req,res)=>{
    return res.status(404).json({mensaje:`Error ruta ${req.baseUrl}, metodo ${req.method} no implementada`})
})
notFoundRouter.put('',(req,res)=>{
    return res.status(404).json({mensaje:`Error ruta ${req.baseUrl}, metodo ${req.method} no implementada`})
})
notFoundRouter.delete('',(req,res)=>{
    return res.status(404).json({mensaje:`Error ruta ${req.baseUrl}, metodo ${req.method} no implementada`})
})



export default notFoundRouter;
