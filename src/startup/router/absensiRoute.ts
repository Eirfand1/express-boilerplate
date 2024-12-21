import express, { Router } from 'express'
import { getAllHandler, getByIdHandler, insertHandler, deleteHandler, updateHandler } from '../handlers/DataHandler'


const route: Router = express.Router()

route.get("/", getAllHandler)
route.get("/:id", getByIdHandler )
route.post("/", insertHandler)
route.put("/:id", updateHandler)
route.delete("/:id", deleteHandler)


export default route