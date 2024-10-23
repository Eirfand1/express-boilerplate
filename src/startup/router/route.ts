import { Express, Request, Response } from "express";
import getDb from "../../db/mongo";
import { ObjectId } from "mongodb";

const routerSetup = (app: Express)=> {
   app.get("/", async (req: Request, res: Response)=>{
      const db = getDb()
      let collection = db.collection("mahasiswa")
      let results = await collection.find({})
      .toArray()
      
      res.json(results)
   })
   
   app.get("/:id", async (req: any, res: Response)=>{
      const db = getDb()
      const collection = db.collection("mahasiswa")
      const id = new ObjectId(req.params.id);
      let results = await collection.findOne({_id: id})
      
      res.json([results])
   }) 
}

export default routerSetup