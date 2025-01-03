import { Express, Request, Response } from "express";
import absensiRoute from './absensiRoute'
import { verifyAdmin, verifyToken } from "../middlewares/authMiddlewares";

const routerSetup = (app: Express, express: any) => {
  app.get("/", async (req: Request, res: Response) => {
    res.status(200).json({
      success: true,
      message: "yoo"
    });
  })

  app.use("/api/absensi", verifyAdmin, absensiRoute)
}

export default routerSetup
