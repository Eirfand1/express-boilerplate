-- CreateEnum
CREATE TYPE "Status" AS ENUM ('CLOSE', 'OPEN');

-- CreateTable
CREATE TABLE "absensi" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "Status" NOT NULL,
    "password" VARCHAR(255) NOT NULL,

    CONSTRAINT "absensi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "detail_absensi" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" UUID NOT NULL,
    "idAbsensi" UUID NOT NULL,
    "status" VARCHAR(20) NOT NULL,

    CONSTRAINT "detail_absensi_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "detail_absensi" ADD CONSTRAINT "detail_absensi_idAbsensi_fkey" FOREIGN KEY ("idAbsensi") REFERENCES "absensi"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
