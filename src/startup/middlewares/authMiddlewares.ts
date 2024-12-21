import { Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { CustomJwtPayload, ResponseBody, UserRole } from '../utils/types'
import dotenv from "dotenv"
dotenv.config()


export const verifyToken = (
  req: any,
  res: Response<ResponseBody>,
  next: NextFunction
): void => {

  try {
    const token: string = req.headers['authorization']
    if (!token) {
      throw new Error('Unauthenticated')
    }

    const jwtSecret: string = process.env.JWT_SECRET!
    const decoded = jwt.verify(token, jwtSecret) as CustomJwtPayload

    req.userId = decoded.id
    next()
  } catch (error: any) {
    res.status(401).json({
      success: false,
      message: error.message || "Invalid Token"
    })
  }
}

export const verifyAdmin = (
  req: any,
  res: Response<ResponseBody>,
  next: NextFunction): void => {

  try {
    const token: string = req.headers['authorization']
    if (!token) {
      throw new Error("Unauthenticated")
    }

    const jwtSecret: string = process.env.JWT_SECRET!
    const decoded = jwt.verify(token, jwtSecret) as CustomJwtPayload

    if (decoded.role !== UserRole.ADMIN) {
      throw new Error("Anda bukan Admin!")
    }

    req.userId = decoded.id
    next()
  } catch (error: any) {
    res.status(401).json({
      success: false,
      message: error.message || "Invalid Token"
    })
  }
}
