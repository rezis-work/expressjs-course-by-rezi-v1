import { type Request, type Response, Router } from "express";
import { validateBody, validateParams, validateQuery } from "../middleware/validation.ts";
import { z } from "zod";

const createHabitSchema = z.object({
  name: z.string(),
});

const completeParamsSchema = z.object({
  id: z.uuid(),
});

const completeQuerySchema = z.object({
  date: z.coerce.date(),
});

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Habits fetched successfully" });
});

router.get("/:id", (req: Request, res: Response) => {
  res.status(200).json({ message: "Habit fetched successfully" });
});

router.post("/", validateBody(createHabitSchema), (req: Request, res: Response) => {
  const { name } = req.body;
  res.status(201).json({ message: "Habit created successfully", data: { name } });
});

router.delete("/:id", (req: Request, res: Response) => {
  res.status(200).json({ message: "Habit deleted successfully" });
});

router.post("/:id/complete", validateParams(completeParamsSchema), validateQuery(completeQuerySchema), (req: Request, res: Response) => {
  const { id } = req.params;
  const { date } = req.query;
  console.log("id", id);
  console.log("date", date);
  res.status(200).json({ message: "Habit completed successfully", data: { id, date } });
});

export default router;
