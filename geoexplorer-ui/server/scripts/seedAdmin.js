/**
 * Seed (or promote) an admin user for local/dev.
 *
 * Usage:
 *   node scripts/seedAdmin.js
 *
 * Env:
 *   ADMIN_EMAIL (required)
 *   ADMIN_PASSWORD (required)
 *   ADMIN_NAME (optional)
 */
import mongoose from 'mongoose'
import { config } from '../config/env.js'
import User from '../models/User.js'

const email = process.env.ADMIN_EMAIL
const password = process.env.ADMIN_PASSWORD
const name = process.env.ADMIN_NAME || 'Admin'

if (!email || !password) {
  console.error('Missing ADMIN_EMAIL or ADMIN_PASSWORD.')
  process.exit(1)
}

async function main() {
  await mongoose.connect(config.MONGO_URI)

  const existing = await User.findOne({ email }).select('+password')
  if (!existing) {
    const created = await User.create({
      name,
      email,
      password,
      role: 'admin',
    })
    console.log(`✅ Admin created: ${created.email}`)
  } else {
    existing.name = existing.name || name
    existing.role = 'admin'

    // If password differs, reset it (will be hashed by pre-save hook)
    existing.password = password
    await existing.save()
    console.log(`✅ Admin promoted/reset: ${existing.email}`)
  }

  await mongoose.disconnect()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})

