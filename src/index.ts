import { app } from "./server.ts";

app.listen(3001, () => {
  console.log("Server is running on port http://localhost:3001");
  console.log("Press Ctrl+C to stop the server");
  console.log("Open your browser and navigate to http://localhost:3001/health");
});
