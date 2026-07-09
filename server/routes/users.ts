import { Hono } from 'hono';
import bcrypt from 'bcryptjs';
import type { AppVariables } from '../types/context.js';
import { AppError, handlePrismaError, notFound } from '../lib/errors.js';
import { ApiMessageKey } from '../lib/message-keys.js';
import { validationError } from '../lib/validation-error.js';
import { createUserSchema, updateUserSchema } from '../lib/validation.js';

const users = new Hono<{ Variables: AppVariables }>();

function omitPasswordHash<T extends { passwordHash?: string }>(
  user: T,
): Omit<T, 'passwordHash'> {
  const rest = { ...user };
  delete rest.passwordHash;
  return rest;
}

users.get('/', async (c) => {
  try {
    const prisma = c.get('prisma');
    const list = await prisma.user.findMany({ orderBy: { createdAt: 'desc' } });
    return c.json({ success: true, data: list.map(omitPasswordHash) });
  } catch (error) {
    throw handlePrismaError(error);
  }
});

users.get('/:id', async (c) => {
  try {
    const prisma = c.get('prisma');
    const user = await prisma.user.findUnique({ where: { id: c.req.param('id') } });
    if (!user) throw notFound(ApiMessageKey.errors.user_not_found, 'USER_NOT_FOUND');
    return c.json({ success: true, data: omitPasswordHash(user) });
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw handlePrismaError(error);
  }
});

users.post('/', async (c) => {
  const body = await c.req.json().catch(() => null);
  const parsed = createUserSchema.safeParse(body);
  if (!parsed.success) throw validationError(parsed.error);

  try {
    const prisma = c.get('prisma');
    const passwordHash = await bcrypt.hash(parsed.data.password, 10);
    const user = await prisma.user.create({
      data: {
        email: parsed.data.email,
        name: parsed.data.name,
        passwordHash,
      },
    });
    return c.json({ success: true, data: omitPasswordHash(user) }, 201);
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw handlePrismaError(error);
  }
});

users.patch('/:id', async (c) => {
  const body = await c.req.json().catch(() => null);
  const parsed = updateUserSchema.safeParse(body);
  if (!parsed.success) throw validationError(parsed.error);

  try {
    const prisma = c.get('prisma');
    const id = c.req.param('id');
    const existing = await prisma.user.findUnique({ where: { id } });
    if (!existing) throw notFound(ApiMessageKey.errors.user_not_found, 'USER_NOT_FOUND');

    const data: { email?: string; name?: string; passwordHash?: string } = {};
    if ('email' in parsed.data) data.email = parsed.data.email;
    if ('name' in parsed.data) data.name = parsed.data.name;
    const { password } = parsed.data;
    if (password !== undefined) {
      data.passwordHash = await bcrypt.hash(password, 10);
    }

    const user = await prisma.user.update({ where: { id }, data });
    return c.json({ success: true, data: omitPasswordHash(user) });
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw handlePrismaError(error);
  }
});

users.delete('/:id', async (c) => {
  try {
    const prisma = c.get('prisma');
    const id = c.req.param('id');
    const existing = await prisma.user.findUnique({ where: { id } });
    if (!existing) throw notFound(ApiMessageKey.errors.user_not_found, 'USER_NOT_FOUND');
    await prisma.user.delete({ where: { id } });
    return c.json({ success: true, data: null });
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw handlePrismaError(error);
  }
});

export default users;
