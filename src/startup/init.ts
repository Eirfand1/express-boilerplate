import { Express } from "express";
import dotenv from 'dotenv'
dotenv.config()

const appSetup = (app: Express)=> {
   const port = process.env.PORT ? parseInt(process.env.PORT) : 3001
   app.listen(port, ()=>{
      console.log(`app running on http://localhost:${port}`)
   })
}

export default appSetup