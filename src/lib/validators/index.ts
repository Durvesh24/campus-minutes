import { z } from 'zod';

export const commonSchemas = {
  id: z.string().cuid(),
  email: z.string().email(),
  phone: z.string().min(10).max(15),
};
