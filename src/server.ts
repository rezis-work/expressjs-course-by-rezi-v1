import express from "express";
import type { Request, Response } from "express";
import authRoutes from "./routes/auth.routes.ts";
import habitRoutes from "./routes/habit.routes.ts";
import userRoutes from "./routes/user.routes.ts";
import { env, isTest } from "../env.ts";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  morgan(
    function (tokens, req, res) {
      // Colorful output using ANSI escape codes:
      // Method: cyan, URL: magenta, Status: green/red/yellow
      // Response time: blue
      const status = tokens.status(req, res);
      let statusColor = "\x1b[32m"; // green
      if (status && Number(status) >= 400 && Number(status) < 500) statusColor = "\x1b[33m"; // yellow
      if (status && Number(status) >= 500) statusColor = "\x1b[31m"; // red

      return [
        "\x1b[36m", // cyan
        tokens.method(req, res),
        "\x1b[0m",
        "\x1b[35m", // magenta
        tokens.url(req, res),
        "\x1b[0m",
        statusColor,
        status,
        "\x1b[0m",
        "\x1b[34m", // blue
        tokens["response-time"](req, res), "ms",
        "\x1b[0m",
        "-", 
        tokens.res(req, res, 'content-length') || '',
        "bytes"
      ].join(" ");
    },
    {
      skip: () => isTest(),
    }
  )
);

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
