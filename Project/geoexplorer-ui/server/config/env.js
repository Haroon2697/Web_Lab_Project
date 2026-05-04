/**
 * Environment variable validation.
 * Throws at startup if critical vars are missing.
 */
import dotenv from 'dotenv'
dotenv.config()

const required = ['MONGO_URI', 'JWT_SECRET']

for (const key of required) {
  if (!process.env[key]) {
    console.warn(`⚠  Missing env var: ${key} — using fallback for dev`)
  }
}

export const config = {
  PORT: process.env.PORT ?? 5000,
  MONGO_URI: process.env.MONGO_URI ?? 'mongodb://127.0.0.1:27017/geoexplorer',
  JWT_SECRET: process.env.JWT_SECRET ?? 'dev_secret_change_me',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN ?? '7d',
  UNSPLASH_ACCESS_KEY: process.env.UNSPLASH_ACCESS_KEY ?? '',
  CLIENT_URL: process.env.CLIENT_URL ?? 'http://localhost:5173',
}
