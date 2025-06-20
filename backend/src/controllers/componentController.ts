import { Request, Response } from "express";
import ComponentTrack from "../models/ComponentTrack";
import { Parser } from "json2csv";

export const trackComponent = async (req: Request, res: Response) => {
  const { name, variant, action } = req.body;
  try {
    const track = await ComponentTrack.create({ name, variant, action });
    res.status(201).json({ message: "Tracking registrado", track });
  } catch (err) {
    res.status(400).json({ message: "Error al registrar tracking" });
  }
};

export const getStats = async (_: Request, res: Response) => {
  try {
    const stats = await ComponentTrack.find()
      .sort({ timestamp: -1 })
      .limit(100);
    res.json(stats);
  } catch (err) {
    res.status(500).json({ message: "Error al obtener estadísticas" });
  }
};

export const exportCSV = async (_: Request, res: Response) => {
  try {
    const data = await ComponentTrack.find();
    const parser = new Parser();
    const csv = parser.parse(data);

    res.header("Content-Type", "text/csv");
    res.attachment("tracking_export.csv");
    res.send(csv);
  } catch (err) {
    res.status(500).json({ message: "Error al exportar CSV" });
  }
};
