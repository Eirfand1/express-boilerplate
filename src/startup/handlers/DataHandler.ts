import { Request, Response } from "express";
import { getById, getAll, insert, deleteData, updateData } from "../services/dataService";
import { ResponseBody } from "../utils/types";
import dotenv from 'dotenv';
import jwt from "jsonwebtoken";
import { CustomJwtPayload } from "../utils/types";
import bcrypt from "bcryptjs";
dotenv.config()

export const getAllHandler = async (
   req: Request,
   res: Response<ResponseBody>
): Promise<void> => {

   try {

      const token: any = req.headers['authorization']
      const jwtSecret: string = process.env.JWT_SECRET!
      const decoded = jwt.verify(token, jwtSecret) as CustomJwtPayload

      const result = await getAll(decoded)
      res.status(200).json({
         success: true,
         data: result
      })
   } catch (error: any) {
      res.status(500).json({
         success: false,
         message: error.message || "Internal Server Error"
      })
   }
}


export const getByIdHandler = async (
   req: Request<{ id: string }>,
   res: Response<ResponseBody>
): Promise<void> => {

   try {
      const result = await getById(req.params.id)

      res.status(200).json({
         success: true,
         data: result
      })

   } catch (error: any) {
      res.status(500).json({
         success: false,
         message: error.message || "Internal Server Error"
      })

   }
}

export const insertHandler = async (
   req: Request<any>,
   res: Response<ResponseBody>
): Promise<void> => {

   try {

      const hashedPassword: string = await bcrypt.hash(req.body.password, 10)
      const absensiDTO = {
         status: req.body.status,
         password: hashedPassword
      }
      const result = await insert(absensiDTO)

      res.status(201).json({
         success: true,
         message: "Data berhasil ditambahkan",
         data: result
      })

   } catch (error: any) {
   }

}

export const updateHandler = async (
   req: Request<{ id: string }, {}>,
   res: Response<ResponseBody>
): Promise<void> => {

   try {
      const dataDTO = {
         id: req.params.id,
         status: req.body.status
      }
      const result = await updateData(dataDTO)

      res.status(201).json({
         success: true,
         message: "Data  berhasil diupdate",
         data: result
      })


   } catch (error: any) {
      res.status(404).json({
         success: false,
         message: error.message || "Internal Server Error"
      })

   }
}

export const deleteHandler = async (
   req: Request<{ id: string }>,
   res: Response<ResponseBody>
): Promise<void> => {

   try {

      const existingData = await getById(req.params.id)

      if (!existingData) {
         res.status(500).json({
            success: false,
            message: "Data tidak ditemukan"
         })
         return
      }

      await deleteData(req.params.id)

      res.status(200).json({
         success: true,
         message: "Data absensi berhasil dihapus"
      })

   } catch (error: any) {
       res.status(404).json({
         success: false,
         message: error.message || "Internal Server Error"
      })

   }

}
