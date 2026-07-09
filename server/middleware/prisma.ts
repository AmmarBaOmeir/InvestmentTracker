import { createMiddleware } from "hono/factory";
import type { AppVariables } from "../types/context.js";
import { prisma } from "../lib/prisma.js";

export const prismaMiddleware = createMiddleware<{ Variables: AppVariables }>(
  async (c, next) => {
    c.set("prisma", prisma);
    await next();
  },
);
