// ⚠️  dotenv MUST be loaded before any other require that reads process.env
require('dotenv').config();

const app = require('./app');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  // Connect to MongoDB Atlas
  await connectDB();

  const server = app.listen(PORT, () => {
    console.log('');
    console.log('╔══════════════════════════════════════════════╗');
    console.log('║        🌿  VERDARA ORGANIC PERFUMES          ║');
    console.log('║              Backend API Server              ║');
    console.log('╚══════════════════════════════════════════════╝');
    console.log(`🚀 Server        : http://localhost:${PORT}`);
    console.log(`🌍 Environment   : ${process.env.NODE_ENV || 'development'}`);
    console.log(`🔗 Health check  : http://localhost:${PORT}/api/health`);
    console.log(`📡 MongoDB Atlas : ${process.env.MONGODB_URI ? 'URI loaded ✅' : 'URI missing ❌'}`);
    console.log('');
  });

  // Graceful shutdown
  const shutdown = (signal) => {
    console.log(`\n⚡ ${signal} received. Shutting down gracefully...`);
    server.close(async () => {
      await require('mongoose').disconnect();
      console.log('✅ HTTP server and MongoDB connection closed.');
      process.exit(0);
    });
  };

  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('SIGINT', () => shutdown('SIGINT'));

  process.on('unhandledRejection', (reason) => {
    console.error('❌ Unhandled Rejection:', reason);
  });
};

startServer();
