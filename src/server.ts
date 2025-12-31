import express from "express";
import type { Request, Response } from "express";
import authRoutes from "./routes/auth.routes.ts";
import habitRoutes from "./routes/habit.routes.ts";
import userRoutes from "./routes/user.routes.ts";
import { env } from "../env.ts";

const app = express();

const api = `/api/${env.VERSION}`;

app.get("/health", (req: Request, res: Response) => {
  res
    .json({
      message: "Hello from express course by rezi",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      memoryUsage: process.memoryUsage(),
      cpuUsage: process.cpuUsage(),
    })
    .status(200);
});

app.use(`${api}/auth`, authRoutes);
app.use(`${api}/habits`, habitRoutes);
app.use(`${api}/users`, userRoutes);

app.post("/cake/:name", (req: Request, res: Response) => {
  console.log("request params", req.params);
  const { name } = req.params;
  res.send(`ok, ${name}, ${JSON.stringify(req.params)}`);
});

export { app };
