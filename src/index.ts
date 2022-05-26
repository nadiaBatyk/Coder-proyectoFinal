import  express  from "express";
import { routerCart } from "./routes/cartRoutes";
import { routerProducts } from "./routes/productsRoutes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/productos',routerProducts)
app.use('/api/carrito',routerCart)
app.get('/',(req,res)=>{
    res.json({mensaje:'holis',edad:28,hobbie:'cantar',comida:'parri'})
})

const PORT = 8080;

const server = app.listen(PORT,()=>{
    console.log(`conectado al puerto ${PORT}`)
})
server.on("error", (error) => console.log(`error en el servidor ${error}`));
