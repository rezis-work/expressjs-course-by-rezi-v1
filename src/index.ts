import { app } from "./server.ts";
import { env } from "../env.ts";

app.listen(env.PORT, () => {
  console.log(`Server is running on port http://localhost:${env.PORT}`);
  console.log("Press Ctrl+C to stop the server");
  console.log(
    `Open your browser and navigate to http://localhost:${env.PORT}/health`
  );
  console.log(`Environment: ${env.APP_STAGE}`);
  console.log(`Node Environment: ${env.NODE_ENV}`);
  console.log(`Port: ${env.PORT}`);
});
