import { type Request, type Response, Router } from "express";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Habits fetched successfully" });
});

router.get("/:id", (req: Request, res: Response) => {
  res.status(200).json({ message: "Habit fetched successfully" });
});

router.post("/", (req: Request, res: Response) => {
  res.status(201).json({ message: "Habit created successfully" });
});

router.delete("/:id", (req: Request, res: Response) => {
  res.status(200).json({ message: "Habit deleted successfully" });
});

router.post("/:id/complete", (req: Request, res: Response) => {
  res.status(200).json({ message: "Habit completed successfully" });
});

export default router;
