import express from "express";
import type { Request, Response } from "express";

const app = express();

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

export { app };
