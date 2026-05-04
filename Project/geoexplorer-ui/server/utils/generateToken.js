/**
 * JWT token generator helper.
 */
import jwt from 'jsonwebtoken'
import { config } from '../config/env.js'

/**
 * Generate a signed JWT for the given user id.
 * @param {string} id - MongoDB _id of the user
 * @returns {string} signed JWT
 */
export function generateToken(id) {
  return jwt.sign({ id }, config.JWT_SECRET, {
    expiresIn: config.JWT_EXPIRES_IN,
  })
}
