import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  PORT: z.string().default('5000'),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  DATABASE_URL: z.string(),
  JWT_SECRET: z.string().default('supersecretjwtkey'),
  GOOGLE_CLIENT_ID: z.string().optional(),
  CLIENT_URL: z.string().default('http://localhost:3000'),
});

export const env = envSchema.parse(process.env);
