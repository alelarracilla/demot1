import { Router } from "express";
import {
  trackComponent,
  getStats,
  exportCSV,
} from "../controllers/componentController";
import { authenticateJWT } from "../middleware/auth";

const router = Router();
router.post("/track", trackComponent);
router.get("/stats", getStats);
router.get("/export", authenticateJWT, exportCSV);
export default router;
