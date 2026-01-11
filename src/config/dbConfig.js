const { Sequelize } = require("sequelize");

const db = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",

    // 🔥 Connection pool (prevents memory leaks)
    pool: {
      max: 10,        // max connections
      min: 0,         // min connections
      acquire: 30000, // wait 30s for a connection
      idle: 10000    // close idle connection after 10s
    },

    logging: process.env.NODE_ENV === "development"
    ? console.log
    : false
  }
);

/* 🔥 Connect to DB */
const connectDB = async () => {
  try {
    await db.authenticate();
    console.log("Database connected ✅");
  } catch (error) {
    console.error("💥Database connection failed:", error.message);

    if (process.env.NODE_ENV === "production") {
      process.exit(1); // crash in prod so Docker/PM2 can restart
    }
  } 
};
module.exports = {db,connectDB};
