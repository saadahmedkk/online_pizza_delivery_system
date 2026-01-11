require('./config/env');
const app = require('./app');

const { connectDB } = require('./config/dbConfig');

async function startServer() {
    const PORT = process.env.PORT;
    // 1. Connect Database
    await connectDB();
    // 2. Start HTTP server
    app.listen(PORT || 3001, () => {
        console.log(`Server running on port ${PORT || 3001} 🚀`);
    });
}

startServer();