import "../env/load-env.js";
import { serve } from "@hono/node-server";
import app from "./app.js";
import { connectPrisma } from "./lib/prisma.js";

const port = Number(process.env.PORT) || 3001;

async function startServer() {
  try {
    await connectPrisma();
  } catch (error) {
    console.error("Failed to connect to the database. Check DATABASE_URL and run migrations.");
    console.error(error);
    process.exit(1);
  }

  serve(
    {
      fetch: app.fetch,
      port,
    },
    (info) => {
      console.log("Server listening on port " + String(info.port));
    },
  );
}

void startServer();
