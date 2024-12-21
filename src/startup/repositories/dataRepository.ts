import { prisma } from "../../../prisma/client";
import { AbsensiDTO, UpdateAbsensiDTO } from "../utils/types";

export class DataRepository {
  async findAll() {
    return await prisma.absensi.findMany()
  }

  async create(absensiDTO: AbsensiDTO) {
    return await prisma.absensi.create({
      data: {
        status: absensiDTO.status,
        password: absensiDTO.password

      } as any 
    });
  }

  async update(absensiDTO: UpdateAbsensiDTO){
    return await prisma.absensi.update({
      where: {
        id: absensiDTO.id
      },
      data: {
        status: absensiDTO.status
      }
    })
  }

  async findByUserId(userId: string): Promise<any> {
    return await prisma.detail_Absensi.findMany({
      where: {
        userId: userId
      } as any
    })
  }

  async findById(id: string) {
    return await prisma.absensi.findFirst({
      where: {
        id: id
      }
    })
  }

  async deleteAbsensi(id: string) {
    return await prisma.absensi.delete({
      where: {
        id: id
      }
    })
  }
}