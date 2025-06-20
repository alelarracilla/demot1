import { Router, Request, Response } from "express";

const router = Router();

router.get("/", (_: Request, res: Response): void => {
  res.json({ status: "ok" });
});

export default router;
