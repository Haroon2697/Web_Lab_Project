/**
 * Global error handler middleware.
 * Catches all errors thrown in routes/controllers.
 */
export function errorHandler(err, _req, res, _next) {
  console.error('❌ Error:', err.message)

  const statusCode = err.statusCode || res.statusCode === 200 ? 500 : res.statusCode

  res.status(statusCode).json({
    message: err.message || 'Internal Server Error',
    stack: process.env.NODE_ENV === 'production' ? undefined : err.stack,
  })
}
