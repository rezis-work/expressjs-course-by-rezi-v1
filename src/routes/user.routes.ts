import { type Request, type Response, Router } from "express";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Users fetched successfully" });
});

router.get("/:id", (req: Request, res: Response) => {
  res.status(200).json({ message: "User fetched successfully" });
});

router.put("/:id", (req: Request, res: Response) => {
  res.status(200).json({ message: "User updated successfully" });
});

router.delete("/:id", (req: Request, res: Response) => {
  res.status(200).json({ message: "User deleted successfully" });
});

export default router;
