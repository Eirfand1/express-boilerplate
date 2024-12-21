import { DataRepository } from "../repositories/dataRepository";
import { AbsensiDTO, AbsensiResponse, UpdateAbsensiDTO, UserRole } from "../utils/types";

export const getAll = async (
   userInfo: { id: string, role: UserRole }
): Promise<AbsensiResponse[]> => {

   const userId = userInfo.id
   const role: string = userInfo.role

   const repository = new DataRepository()

   if (role === "ADMIN") {
      return await repository.findAll()
   }

   return await repository.findByUserId(userId)
}

export const insert = async (absensiDTO: AbsensiDTO): Promise<AbsensiResponse> => {
   const repository = new DataRepository()
   return await repository.create(absensiDTO)

}

export const getById = async (id: string): Promise<AbsensiResponse | null> => {
   const repository = new DataRepository()
   const result = repository.findById(id)

   if (!result) {
      throw new Error("User not found")
   }

   return result

}

export const deleteData = async (id: string): Promise<AbsensiResponse> => {
   const repository = new DataRepository()
   const existingData = await repository.findById(id);

   if (!existingData) {
      throw new Error("Data tidak ditemukan")
   }

   return await repository.deleteAbsensi(id)
}

export const updateData = async (
   absensiDTO: UpdateAbsensiDTO 
): Promise<any> => {

   const repository = new DataRepository()
   const existingData = await repository.findById(absensiDTO.id)

   if (!existingData) {
      throw new Error("Data tidak ditemukan")
   }

   return await repository.update(absensiDTO)
}
