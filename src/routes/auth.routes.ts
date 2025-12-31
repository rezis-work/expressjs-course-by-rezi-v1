import { type Request, type Response, Router } from "express";

const router = Router();

router.post("/register", (req: Request, res: Response) => {
  res.status(201).json({ message: "User registered successfully" });
});

router.post("/login", (req: Request, res: Response) => {
  res.status(200).json({ message: "User logged in successfully" });
});

export default router;
