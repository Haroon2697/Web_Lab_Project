/**
 * GeoExplorer API entry point.
 * Connects to MongoDB then starts Express server.
 */
import { config } from './config/env.js'
import { connectDB } from './config/db.js'
import app from './app.js'

const PORT = config.PORT

async function main() {
  await connectDB()
  app.listen(PORT, () => {
    console.log(`🌍 GeoExplorer API listening on http://localhost:${PORT}`)
  })
}

main()
