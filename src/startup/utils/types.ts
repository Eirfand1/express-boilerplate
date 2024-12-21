import { JwtPayload } from "jsonwebtoken";
import { Status } from "@prisma/client";

export interface AbsensiDTO {
  status: Status 
  password: string
}

export interface UpdateAbsensiDTO {
  id: string,
  status: Status
}

export interface DetailAbsensiDTO {
  userId: string 
  idAbsensi: string 
  status: StatusAbsensi 
  password: string 
}

export interface AbsensiResponse {
  id: string
  createdAt: Date
  status: string
  password: string
}

export enum UserRole {
  USER = "USER",
  ADMIN = "ADMIN",
  PENGURUS = "PENGURUS"
}

export enum StatusAbsensi {
  OPEN = "OPEN",
  CLOSE = "CLOSE"
}

export interface CustomJwtPayload extends JwtPayload {
  id: string
  role: UserRole 
}

export interface ResponseBody {
  success: boolean
  message?: string
  data?: AbsensiResponse | AbsensiResponse[] | null
}