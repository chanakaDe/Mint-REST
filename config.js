module.exports = {
  database: process.env.DATABASE_URL || "mongodb://localhost:27017/test-api",
  port: process.env.PORT || 3000,
  secretKey: process.env.secretKey || "123456789"
};
