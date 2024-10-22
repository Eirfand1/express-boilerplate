import { Express } from "express";
import dotenv from 'dotenv'
dotenv.config()

const appSetup = (app: Express)=> {
   const port: number = 3000 
   app.listen(port, ()=>{
      console.log(`app running on http://localhost:${port}`)
   })
}

export default appSetup